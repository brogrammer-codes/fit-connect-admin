import { Input } from "@/components/ui/input"

interface ActivityInputInterface {
    activityId: string, 
    key: string, 
    value: string,
}
export const ActivityInput: React.FC<ActivityInputInterface> = ({value, key, activityId}) => {

    return (
        <Input value={value}/>
    )
}