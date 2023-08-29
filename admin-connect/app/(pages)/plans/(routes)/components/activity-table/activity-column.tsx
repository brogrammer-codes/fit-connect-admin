"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityStatus } from "@prisma/client";
import { StatusPill } from "@/components/status-pill";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActivityInput } from "./activity-input";

export type ActivityColumn = {
  id: string;
  name: string;
  status: ActivityStatus;
  description: string;
  videoUrl: string;
};

export const columns: ColumnDef<ActivityColumn>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="name" key={id} />;
    },
  },
  {
    id: "tag_1",
    header: "Tag 1",
  },
  {
    id: "controls",
    header: "Controls",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <StatusPill status={row.original.status} />
        <ActivityInput activityId={row.original.id} inputKey="videoUrl" key={row.original.id} />
        <ActivityInput activityId={row.original.id} inputKey="description" key={row.original.id} />
      </div>
    ),
  },
];
