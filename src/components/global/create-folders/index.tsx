"use client";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";
import { FolderIcon } from "lucide-react";
import React from "react";

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { createNewFolder } = useCreateFolders(workspaceId);

  return (
    <Button
      onClick={createNewFolder}
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
      <FolderIcon />
      Create a folder
    </Button>
  );
};

export default CreateFolders;
