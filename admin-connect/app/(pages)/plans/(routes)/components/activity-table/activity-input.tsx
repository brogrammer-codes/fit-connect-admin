import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/hooks/use-plan-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Book, VideoIcon } from "lucide-react";

type ActivityInputKeys = "name" | "videoUrl" | "description";

interface ActivityInputInterface {
  activityId: string;
  inputKey: ActivityInputKeys;
}
export const ActivityInput: React.FC<ActivityInputInterface> = ({
  inputKey,
  activityId,
}) => {
  const { setActivityList, activityList } = usePlanStore();
  const activity = activityList.find((act) => act.id === activityId);
  if (!activity) return null;
  const updateActivity = async () => {
    try {
      await axios.patch(`/api/activities/${activityId}`, activity);
    } catch (error) {}
  };
  const onInputChange = (value: string) => {
    const updatedActivityList = [...activityList];
    const index = updatedActivityList.findIndex(
      (item) => item.id === activityId
    );
    if (index !== -1) {
      updatedActivityList[index][inputKey] = value;

      setActivityList([...updatedActivityList]);
    }
  };
  // TODO: Add activity picker when the input key is name
  // if(inputKey === "name") {
  //   return (
  //     <></>
  //   )
  // }
  if (inputKey === "videoUrl") {
    return (
      <Popover>
        <PopoverTrigger>
          <VideoIcon />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          <span>Video Url</span>
          <Input
            value={activity[inputKey]}
            onChange={({ target: { value } }) => onInputChange(value)}
            onBlur={updateActivity}
          />
        </PopoverContent>
      </Popover>
    );
  }
  if (inputKey === "description") {
    return (
      <Popover>
        <PopoverTrigger>
          <Book />
        </PopoverTrigger>
        <PopoverContent>
          <Input
            value={activity[inputKey]}
            onChange={({ target: { value } }) => onInputChange(value)}
            onBlur={updateActivity}
          />
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Input
      value={activity[inputKey]}
      onChange={({ target: { value } }) => onInputChange(value)}
      onBlur={updateActivity}
    />
  );
};
