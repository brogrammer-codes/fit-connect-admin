"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plan } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  plan: Plan;
}

export function ActivityTable<TData, TValue>({
  columns,
  data,
  plan,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if(header.id === "tag_1" && plan.tag_1.length) {
                    return (<TableHead key={header.id}> {plan.tag_1}</TableHead>)
                  }
                  if(header.id === "tag_2" && plan.tag_2.length) {
                    return (<TableHead key={header.id}> {plan.tag_2}</TableHead>)
                  }
                  if(header.id === "tag_3" && plan.tag_3.length) {
                    return (<TableHead key={header.id}> {plan.tag_3}</TableHead>)
                  }
                  if(header.id === "tag_4" && plan.tag_4.length) {
                    return (<TableHead key={header.id}> {plan.tag_4}</TableHead>)
                  }
                  if(header.id === "tag_5" && plan.tag_5.length) {
                    return (<TableHead key={header.id}> {plan.tag_5}</TableHead>)
                  }
                  if(header.id === "tag_6" && plan.tag_6.length) {
                    return (<TableHead key={header.id}> {plan.tag_6}</TableHead>)
                  }
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )})}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Activities In Plan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
