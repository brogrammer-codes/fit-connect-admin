import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { PlanDisplay } from "./components/plan-display";
import { PlanColumn } from "@/components/plan-table/plan-columns";

export default async function Plans() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const plans = await prismadb.plan.findMany({
    where: { userId: userId, status: 'DRAFT' },
    include: { activityList: true },
  });
  const formattedPlans: PlanColumn[] = plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    status: plan.status,
    createdAt: format(plan.createdAt, "MMMM do, yyyy"),
    activityList: plan.activityList,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanDisplay plans={formattedPlans}/>
      </div>
    </div>
  );
}
