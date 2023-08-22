"use client"
import { PlanForm } from "../components/plan-form";
import { usePlanStore } from "@/hooks/use-plan-store";
import { useEffect } from "react";
import axios from "axios";

const PlanPage = ({ params }: { params: { planId: string } }) => {
  const {plan, setPlan, setActivityList, activityList} = usePlanStore()
  useEffect(() => {
    const findPlan = async () => await axios.get(`/api/plans/${params.planId}`)
    findPlan().then((plan) => {
      
      setPlan(plan.data)
      setActivityList(plan.data.activityList)
    })
  }, [params, setActivityList, setPlan])
  
  console.log(plan?.name);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanForm initialData={plan} initialActivityList={activityList} />
      </div>
    </div>
  );
};
export default PlanPage;
