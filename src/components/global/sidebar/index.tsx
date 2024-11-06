"use client";
import { getWorkSpaces } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { WorkSpaceProps } from "@/types/index.type";
import React from "react";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";
import { useRouter } from "next/navigation";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = data as WorkSpaceProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <p className="text-2xl">Loom</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem value={workspace.id} key={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}>
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Modal
        trigger={
          <span className="text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/90 hover:border-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
            <PlusCircle
              size={15}
              className="text-neutral-800/90 fill-neutral-500"
            />
            <span className="text-neutral-400 font-semibold text-xs">
              Invite to Workspace
            </span>
          </span>
        }
        title="Invite to Workspace"
        description="Invite your friends to join your workspace">
        <Search workspaceId={activeWorkspaceId} />
      </Modal>
    </div>
  );
};

export default Sidebar;
