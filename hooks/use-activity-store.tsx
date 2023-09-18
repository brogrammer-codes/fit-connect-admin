import { Activity, Plan } from "@prisma/client";
import { create } from "zustand";

interface ActivityState {
  activity: Activity | null;
  activityModalOpen: boolean;
  activityLoading: boolean;
  setActivity: (activity: Activity) => void;
  resetActivity: () => void;
  setActivityModalOpen: (open: boolean) => void
  setActivityLoading: (activityLoading: boolean) => void
}

export const useActivityStore = create<ActivityState>()((set) => ({
  activity: null,
  activityModalOpen: false,
  activityLoading: false,
  setActivity: (activity) => set(() => ({activity})),
  resetActivity: () => set({activity: null}),
  setActivityModalOpen: (activityModalOpen) => set({activityModalOpen}),
  setActivityLoading: (activityLoading) => set({activityLoading})
}));
