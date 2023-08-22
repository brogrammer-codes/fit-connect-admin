import { Input } from "@/components/ui/input"
import { usePlanStore } from "@/hooks/use-plan-store"
import { Activity } from "@prisma/client";
import axios from "axios"
import { useRouter } from "next/navigation";

type ActivityInputKeys = "name" | "videoUrl"

interface ActivityInputInterface {
    activityId: string, 
    key: ActivityInputKeys, 
    value: string,
}
export const ActivityInput: React.FC<ActivityInputInterface> = ({value, key, activityId}) => {
    const {setActivityList, activityList} = usePlanStore()
    const router = useRouter()
    const updateActivity = async () => {
        try {
            const activity = activityList.find((act) => act.id === activityId)
            if(activity){
                await axios.patch(`/api/activities/${activityId}`, activity);
                router.refresh();
            }
            
        } catch (error) {
            
        }
    }
    const onInputChange = (value: string) => {
        const activity = activityList.find((act) => act.id === activityId)
        const listFilter = activityList.filter((act) => act.id !== activityId)
        if(activity) {
            activity[key] = value
            setActivityList([...listFilter, activity])
        }
    }

    return (
        <Input value={value} onChange={({target:{ value}}) => onInputChange(value)} onBlur={updateActivity}/>
    )
}