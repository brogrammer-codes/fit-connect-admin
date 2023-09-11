"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { PlanColumn, columns } from "@/components/plan-table/plan-columns";
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
      <div className="flex items-center justify-between pb-2">
        <Heading
          title={`Plans (${plans.length})`}
          description="Your plan list, add a new one or edit existing ones here. If you created a new plan and it does not show up here try refreshing the page."
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
