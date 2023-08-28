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
        original: { id, name },
      } = row;
      return (
        <ActivityInput value={name} activityId={id} inputKey="name" key={id} />
      );
    },
  },
  {
    id: "tag_1",
    header: "Tag 1",
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      const {
        original: { id, description },
      } = row;
      return (
        <Popover>
          <PopoverTrigger>Description</PopoverTrigger>
          <PopoverContent>{description}</PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "videoUrl",
    header: "Video",
    cell: ({ row }) => {
      const {
        original: { id, videoUrl },
      } = row;
      return (
        <Popover>
          <PopoverTrigger>URL</PopoverTrigger>
          <PopoverContent>{videoUrl}</PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <StatusPill status={row.original.status} />,
  },
];
