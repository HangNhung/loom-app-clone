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
import { MenuIcon, PlusCircle } from "lucide-react";
import Search from "../search";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const menuItems = MENU_ITEMS(activeWorkspaceId);
  const { data: workspace } = data as WorkSpaceProps;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace = workspace?.workspace.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  if (isFetched && workspace) {
    dispatch(WORKSPACES({ workspaces: workspace.workspace }));
  }

  const SidebarSection = (
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
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan === "PRO" && (
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
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>

      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    key={item.name}
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                href={`/dashboard/${item.WorkSpace.id}`}
                icon={
                  <WorkspacePlaceholder>
                    {item.WorkSpace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
                selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                title={item.WorkSpace.name}
                key={item.WorkSpace.name}
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
          footer={<Button className="text-sm w-full">Upgrade</Button>}
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <InfoBar />
      {/* // Sheet mobile and desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant="ghost" className="mt-[2px]">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetTitle className="hidden"></SheetTitle> {/*👈🏻 */}
          <SheetDescription className="hidden"></SheetDescription> {/*👈🏻 */}
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
