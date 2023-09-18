"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, Video } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { ActivityColumn } from "./columns";
import { useActivityStore } from "@/hooks/use-activity-store";
import { Activity } from "@prisma/client";

interface CellActionProps {
  data: ActivityColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const {setActivity, setActivityModalOpen} = useActivityStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/activities/${data.id}`);
      toast.success("Activity deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete activity");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Activity video URL copied to clipboard.");
  };
  const onOpenModal = () => {
    setActivity(data as unknown as Activity)
    setActivityModalOpen(true)
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.videoUrl.length ? (<DropdownMenuItem onClick={() => onCopy(data.videoUrl)}>
            <Video className="mr-2 h-4 w-4" /> Copy URL
          </DropdownMenuItem>) : null}
          <DropdownMenuItem onClick={onOpenModal}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-700" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
