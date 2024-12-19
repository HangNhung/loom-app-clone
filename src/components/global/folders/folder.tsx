"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { FolderIcon } from "lucide-react";
import { useMutationData, useMutationDateState } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  // WIP: add loading states

  // Optimistic
  const { mutate, isPending } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    Renamed
  );

  const { latestVariables } = useMutationDateState(["rename-folders"]);

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
    // Rename functionality
  };

  const updateFolderName = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value });
      } else Renamed();
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]"
      )}>
      <Loader state={isPending}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              autoFocus
              placeholder={name}
              ref={inputRef}
              className="border-none outline-none text-base w-full text-neutral-300 bg-transparent p-0"
              onBlur={updateFolderName}
            />
          ) : (
            <p
              className="text-neutral-300"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleNameDoubleClick}>
              {latestVariables &&
              latestVariables.status === "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon />
    </div>
  );
};

export default Folder;
