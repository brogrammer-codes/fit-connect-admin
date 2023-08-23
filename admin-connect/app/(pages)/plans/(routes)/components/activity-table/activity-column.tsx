"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityStatus } from "@prisma/client";
import { StatusPill } from "@/components/status-pill";
import { Input } from "@/components/ui/input";
import { ActivityInput } from "./activity-input";

export type ActivityColumn = {
  id: string;
  name: string;
  status: ActivityStatus;
};

export const columns: ColumnDef<ActivityColumn>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const {
        original: { id, name },
      } = row;
      return <ActivityInput value={name} activityId={id} inputKey="name" key={id}/>;
    },
  },
  {
    id: "tag_1",
    header: "Tag 1"
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <StatusPill status={row.original.status} />,
  },
];
