import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  className?: string;
  videoId: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | null;
};

const CopyLink = ({ className, videoId, variant }: Props) => {
  const onCopyClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`
    );
    return toast.success("Copied to clipboard", {
      description: "Link successfully copied to clipboard",
    });
  };

  return (
    <Button variant={variant} onClick={onCopyClipboard} className={className}>
      <Link2 size={20} className="text-[#d4d4d4]" />
    </Button>
  );
};

export default CopyLink;
