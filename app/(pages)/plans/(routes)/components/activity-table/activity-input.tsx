import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/hooks/use-plan-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Book, VideoIcon } from "lucide-react";
import ActivityPicker from "@/components/activity-picker";
import { Activity } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

type ActivityInputKeys = "name" | "videoUrl" | "description" | "tag_1" | "tag_2"| "tag_3"| "tag_4"| "tag_5"| "tag_6";

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
  const updateActivity = async (newActivity?: Activity) => {
    try {
      await axios.patch(
        `/api/activities/${activityId}`,
        newActivity || activity
      );
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
  const onActivitySelect = (updatedAct: Activity) => {
    const updatedActivityList = [...activityList];
    const index = updatedActivityList.findIndex(
      (item) => item.id === activityId
    );
    if (index !== -1) {
      updatedActivityList[index]["name"] = updatedAct.name;
      updatedActivityList[index]["description"] = updatedAct.description;
      updatedActivityList[index]["videoUrl"] = updatedAct.videoUrl;
      setActivityList([...updatedActivityList]);
      updateActivity(updatedActivityList[index]);
    }
  };
  const activityInputOnBlur = (activityName: string) => {
    const updatedActivityList = [...activityList];
    const index = updatedActivityList.findIndex(
      (item) => item.id === activityId
    );
    if (index !== -1) {
      updatedActivityList[index]["name"] = activityName;
      setActivityList([...updatedActivityList]);
      updateActivity(updatedActivityList[index]);
    }
  };
  // TODO: Add activity picker when the input key is name
  if (inputKey === "name") {
    return (
      <ActivityPicker
        currentActivity={activity}
        onActivitySelect={onActivitySelect}
        onPickerBlur={activityInputOnBlur}
      />
    );
  }
  if (inputKey === "videoUrl") {
    return (
      <Popover>
        <PopoverTrigger>
          <VideoIcon />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col space-y-2 p-3">
          <span className="text-xs text-slate-600 font-semibold">
            Video URL
          </span>
          <Input
            value={activity[inputKey]}
            onChange={({ target: { value } }) => onInputChange(value)}
            onBlur={() => updateActivity()}
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
        <PopoverContent className="flex flex-col space-y-2 p-3">
          <span className="text-xs text-slate-600 font-semibold">
            Description
          </span>
          <Textarea
            value={activity[inputKey]}
            onChange={({ target: { value } }) => onInputChange(value)}
            onBlur={() => updateActivity()}
          />
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Input
      value={activity[inputKey]}
      onChange={({ target: { value } }) => onInputChange(value)}
      onBlur={() => updateActivity()}
    />
  );
};
