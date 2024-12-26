"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDateState } from "@/hooks/useMutationData";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();
  // Get folders
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDateState(["create-folder"]);

  const { status, data: folders } = data as FoldersProps;

  if (isFetched && folders) {
    dispatch(FOLDERS({ folders: folders }));
  }

  // WIP: Add Redux stuff for folders
  // Optimistic variables =
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <h2 className="text-[#BDBDBD] text-xl"> Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD] text-sm">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 w-full overflow-x-auto"
        )}>
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status == "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
              />
            )}
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                id={folder.id}
                count={folder._count.videos}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
