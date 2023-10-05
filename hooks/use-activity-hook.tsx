import { Activity } from "@prisma/client";
import axios from "axios";

export const useActivityHook = () => {
  const updateActivity = async (activity: Activity, activityId: string) => {
    try {
      await axios.patch(`/api/activities/${activityId}`, activity);
    } catch (error) {}
  };
  return { updateActivity };
};
