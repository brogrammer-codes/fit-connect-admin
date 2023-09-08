import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { DataTable } from "@/components/ui/data-table";
import { PlanColumn, columns } from "@/components/plan-table/plan-columns";
import { format } from "date-fns";
import { Activity, Plan, PlanStatus } from "@prisma/client";
import Link from "next/link";
import { PlanFeedback } from "@/components/plan-feedback";

interface PlanWithActivityList extends Plan {
  activityList: Activity[];
}
interface ClientDetailsProps {
  plans: PlanWithActivityList[];
}

export const ClientPlanDetails: React.FC<ClientDetailsProps> = ({ plans }) => {
  if (!plans) return null;
  const assignedPlans = plans.filter(
    (plan) => plan.status === PlanStatus.ASSIGNED
  );
  const completePlans = plans.filter(
    (plan) => plan.status === PlanStatus.COMPLETE
  );
  const formattedAssignedPlans: PlanColumn[] = assignedPlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    status: plan.status,
    createdAt: format(plan.createdAt, "MMMM do, yyyy"),
    activityList: plan.activityList,
  }));
  return (
    <div>
      <DataTable
        columns={columns}
        data={formattedAssignedPlans}
        filterKey="name"
      />
      <h1 className=" text-2xl font-semibold">Complete Plans</h1>

      {completePlans.map((plan) => (
        <PlanFeedback {...plan} key={plan.id} />
      ))}
    </div>
  );
};
