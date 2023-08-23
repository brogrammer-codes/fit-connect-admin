"use client"
import { PlanForm } from "../components/plan-form";
import { usePlanStore } from "@/hooks/use-plan-store";
import { useEffect } from "react";
import axios from "axios";

const PlanPage = ({ params }: { params: { planId: string } }) => {
  const {setPlan, setActivityList, resetPlan} = usePlanStore()
  useEffect(() => {
    const findPlan = async () => await axios.get(`/api/plans/${params.planId}`)
    console.log("finding plan");
    
    findPlan().then((plan) => {
      setPlan(plan.data)
      setActivityList(plan.data.activityList)      
    }).catch(() => {
      resetPlan()
      setActivityList([])

    })

  }, [params, setActivityList, setPlan, resetPlan])
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanForm />
      </div>
    </div>
  );
};
export default PlanPage;
