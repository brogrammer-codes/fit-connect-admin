import { Input } from "@/components/ui/input"
import { usePlanStore } from "@/hooks/use-plan-store"
import axios from "axios"
import { useRouter } from "next/navigation";

interface ActivityInputInterface {
    activityId: string, 
    key: string, 
    value: string,
}
export const ActivityInput: React.FC<ActivityInputInterface> = ({value, key, activityId}) => {
    const {setActivityList, activityList} = usePlanStore()
    const router = useRouter()
    const updateActivity = async () => {
        const activity = activityList.find((act) => act.id === activityId)
        if(activity){
            await axios.patch(`/api/activities/${activityId}`, activity);
            router.refresh();
        }
    }
    const onInputChange = (value: string) => {
        const activity = activityList.find((act) => act.id === activityId)
        const listFilter = activityList.filter((act) => act.id !== activityId)
        if(activity) {
            activity.name = value
            setActivityList([...listFilter, activity])
        }
    }
    const onInputBlur = () => {
        updateActivity()
    }
    return (
        <Input value={value} onChange={({target:{ value}}) => onInputChange(value)} onBlur={onInputBlur}/>
    )
}