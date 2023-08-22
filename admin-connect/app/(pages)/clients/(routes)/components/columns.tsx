"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ClientColumn = {
  id: string;
  name: string;
  createdAt: string;
  plans: number;
  email: string;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "plans",
    header: "Plans",
    cell: ({ row }) => <span>{row.original.plans}</span>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
