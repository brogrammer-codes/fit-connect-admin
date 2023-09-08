"use client";
import prismadb from "@/lib/prismadb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { DataTable } from "@/components/ui/data-table";
import { PlanColumn, columns } from "@/components/plan-table/plan-columns";
import { format } from "date-fns";
import { Activity, Plan, PlanStatus } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";

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
        <Collapsible key={plan.id}>
          <CollapsibleTrigger
            key={plan.id}
            className="flex flex-col m-4 bg-slate-300 p-4 rounded-r-lg rounded-bl-lg w-full items-start"
          >
            <Link href={`/plans/${plan.id}`}>
            <span className=" text-slate-600 text-sm">
              Plan: {plan.name} - {format(plan.updatedAt, "MMMM do, yyyy")}
            </span>
            </Link>
            {plan.note && <span className=" text-lg ">{plan.note}</span>}
          </CollapsibleTrigger>
          {plan.activityList.length && (
            <CollapsibleContent className=" mx-10 ">
              {plan.activityList.map((activity) => (
                <span
                  key={activity.id}
                  className="flex flex-col p-4 rounded-r-lg rounded-bl-lg bg-slate-200 my-2"
                >
                  <span className=" text-slate-600 text-sm">
                    Activity: {activity.name} -{" "}
                    {format(activity.updatedAt, "MMMM do, yyyy")}
                  </span>
                  {activity.note && (
                    <span className=" text-lg ">{activity.note}</span>
                  )}
                </span>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      ))}
    </div>
  );
};
