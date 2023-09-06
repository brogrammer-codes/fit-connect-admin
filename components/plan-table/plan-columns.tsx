"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./plan-cell-action";
import { Activity, PlanStatus } from "@prisma/client";
import { StatusPill } from "@/components/status-pill";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";

export type PlanColumn = {
  id: string;
  name: string;
  createdAt: string;
  status: PlanStatus;
  activityList: Activity[];
};

export const columns: ColumnDef<PlanColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "status",
    header: "Status",
    cell: ({row}) => <StatusPill status={row.original.status}/>
  },
  {
    id: "status",
    header: "No. Activities",
    cell: ({row}) => <span>{row.original.activityList.length}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
