import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/hooks/use-plan-store";
import { Activity } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type ActivityInputKeys = "name" | "videoUrl";

interface ActivityInputInterface {
  activityId: string;
  inputKey: ActivityInputKeys;
  value: string;
}
export const ActivityInput: React.FC<ActivityInputInterface> = ({
  value,
  inputKey,
  activityId,
}) => {
  const { setActivityList, activityList } = usePlanStore();
  const router = useRouter();
  const activity = activityList.find((act) => act.id === activityId);
  if(!activity) return null
  const updateActivity = async () => {
    try {
        await axios.patch(`/api/activities/${activityId}`, activity);
    } catch (error) {}
  };
  const onInputChange = (value: string) => {
    const updatedActivityList = [...activityList]
    const index = updatedActivityList.findIndex((item) => item.id === activityId)
    if (index !== -1) {
      updatedActivityList[index][inputKey] = value;
      
      setActivityList([...updatedActivityList]);
    }
  };

  return (
    <Input
      value={activity[inputKey]}
      onChange={({ target: { value } }) => onInputChange(value)}
      onBlur={updateActivity}
    />
  );
};
