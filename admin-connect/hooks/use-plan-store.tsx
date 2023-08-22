import { Activity, Plan } from "@prisma/client";
import { create } from "zustand";

interface PlanState {
  plan: Plan | null;
  activityList: Activity[] | [];
  setPlan: (plan: Plan) => void;
  setActivityList: (activityList: Activity[]) => void;
  resetPlan: () => void
}

export const usePlanStore = create<PlanState>()((set) => ({
  plan: null,
  activityList: [],
  setPlan: (plan) => set(() => ({plan})),
  setActivityList: (activityList) => set(() => ({activityList})),
  resetPlan: () => set({plan: null})
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
