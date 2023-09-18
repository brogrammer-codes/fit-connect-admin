"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Client } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ActivityColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useActivityStore } from "@/hooks/use-activity-store";

interface ActivityDisplayInterface {
  activityList: ActivityColumn[];
}

export const ActivityDisplay: React.FC<ActivityDisplayInterface> = ({
  activityList,
}) => {
  const router = useRouter();
  const { setActivityModalOpen, resetActivity } = useActivityStore();
  const openActivityModal = () => {
    resetActivity()
    setActivityModalOpen (true)
  }
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <Heading
          title={`Activities (${activityList.length})`}
          description="These are a list of your activities. "
        />

        <Button onClick={openActivityModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={activityList} filterKey="name" />
    </div>
  );
};
