"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Plan } from "@prisma/client";
import PlanPicker from "../plan-picker";
import axios from "axios";
import Link from "next/link";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planId: string) => void;
  clientId: string;
  clientName: string;
  loading?: boolean;
}

export const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  clientId,
  clientName,
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
      title={`Assign a plan to ${clientName}`}
      description="Pick a plan to assign to your client, it will get added to the end of their queue."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-y-2 flex flex-col items-center justify-end w-full">
        <PlanPicker items={planList} currentPlan={plan} onPlanSelect={onPlanSelect} />
        {plan ? <div> Do you want to <span className=" font-sans">{plan.name}</span> to {clientName} ?</div> : null}
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {plan ? (<Button disabled={loading} variant="default" onClick={() => { onClose(); onConfirm(plan.id) }}>
          Assign
        </Button>) : null}
        <Button variant="secondary"><Link href={`/plans/new?clientId=${clientId}`}>Add New Plan</Link></Button>
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>

      </div>
    </Modal>
  );
};
