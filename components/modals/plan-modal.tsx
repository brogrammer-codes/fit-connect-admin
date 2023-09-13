"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Plan } from "@prisma/client";
import PlanPicker from "../plan-picker";
import axios from "axios";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planId: string) => void;
  loading: boolean;
}

export const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [planList, setPlanList] = useState<Plan[] | []>([]);
  const [plan, setPlan] = useState<Plan | null>(null)


  useEffect(() => {
    setIsMounted(true);
    const findPlans = async () => await axios.get('/api/plans')
    findPlans().then(({ data }) => setPlanList([...data]))
  }, []);
  if (!isMounted) {
    return null;
  }

  const onPlanSelect = (id: string) => {
    const selectedPlan = planList.find((c) => c.id === id)
    if (selectedPlan) setPlan(selectedPlan)
  }


  return (
    <Modal
      title="Assign this Plan to a Plan?"
      description="This will be added to the end of the plans the plan has."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-y-2 flex flex-col items-center justify-end w-full">
        <PlanPicker items={planList} currentPlan={plan} onPlanSelect={onPlanSelect} />
        {plan ? <div> Do you want to assign this to {plan.name}?</div> : null}
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {plan ? (<Button disabled={loading} variant="outline" onClick={() => { onClose(); onConfirm(plan.id) }}>
          Assign
        </Button>) : null}
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>

      </div>
    </Modal>
  );
};
