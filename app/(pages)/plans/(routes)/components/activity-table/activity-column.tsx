"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActivityStatus } from "@prisma/client";
import { StatusPill } from "@/components/status-pill";
import { ActivityInput } from "./activity-input";
import { ActivityAction } from "./activity-cell-actions";

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
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_1" key={id} />;
    },
  },
  {
    id: "tag_2",
    header: "Tag 2",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_2" key={id} />;
    },
  },
  {
    id: "tag_3",
    header: "Tag 3",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_3" key={id} />;
    },
  },
  {
    id: "tag_4",
    header: "Tag 4",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_4" key={id} />;
    },
  },
  {
    id: "tag_5",
    header: "Tag 5",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_5" key={id} />;
    },
  },
  {
    id: "tag_6",
    header: "Tag 6",
    cell: ({ row }) => {
      const {
        original: { id },
      } = row;
      return <ActivityInput activityId={id} inputKey="tag_6" key={id} />;
    },
  },
  {
    id: "controls",
    header: "Controls",
    cell: ({ row }) => (
      <ActivityAction data={row.original} key={row.original.id}/>
    ),
  },
];
