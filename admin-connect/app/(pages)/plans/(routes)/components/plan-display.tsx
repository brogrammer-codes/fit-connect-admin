"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Activity, Plan } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { PlanColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";

interface PlanDisplayInterface {
  plans: PlanColumn[];
}

export const PlanDisplay: React.FC<PlanDisplayInterface> = ({
  plans,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Plans (${plans.length})`}
          description="Your client list, add a new one or edit existing ones here."
        />

        <Button onClick={() => router.push(`/plans/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={plans} filterKey="name" />
    </div>
  );
};
