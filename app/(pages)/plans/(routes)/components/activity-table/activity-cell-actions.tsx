"use client";

import axios from "axios";
import { useState } from "react";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertModal } from "@/components/modals/alert-modal";

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
      await axios.delete(`/api/activities/${data.id}`);
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
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent className="flex flex-row space-x-2 p-3 w-fit">
          {
            data.type !== "ACTIVITY" ? (<Button size={'sm'}>Convert to Activity</Button>) : null
          }
          {
            data.type !== "HEADING" ? (<Button size={"sm"}>Convert to Heading</Button>) : null
          }
          {
            data.type !== "SUPERSET" ? (<Button size={"sm"}>Convert to Superset</Button>) : null
          }
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => setDeleteAlertOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
