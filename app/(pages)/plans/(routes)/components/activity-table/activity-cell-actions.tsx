"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, User2 } from "lucide-react";
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

import { ClientModal } from "@/components/modals/client-modal";
import { PlanStatus } from "@prisma/client";
import { ActivityColumn } from "./activity-column";
import { StatusPill } from "@/components/status-pill";
import { ActivityInput } from "./activity-input";

interface ActivityActionProps {
  data: ActivityColumn;
}

export const ActivityAction: React.FC<ActivityActionProps> = ({ data }) => {
  const router = useRouter();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/activities/${data.id}`
      );
      toast.success("Activity deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete Activity");
    } finally {
      setDeleteAlertOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <StatusPill status={data.status} />
      <ActivityInput activityId={data.id} inputKey="videoUrl" />
      <ActivityInput activityId={data.id} inputKey="description" />
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={() => setDeleteAlertOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
  
};
