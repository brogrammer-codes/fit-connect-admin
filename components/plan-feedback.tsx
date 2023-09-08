import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Activity, Plan } from "@prisma/client";
import { format } from "date-fns";
import { DoorOpenIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PlanWithActivityList extends Plan {
  activityList: Activity[];
}
export const PlanFeedback: React.FC<PlanWithActivityList> = (props) => {
  return (
    <Collapsible key={props.id}>
      <CollapsibleTrigger
        key={props.id}
        className="flex flex-col m-4 bg-slate-300 p-4 rounded-r-lg rounded-bl-lg w-full items-start"
      >
        <span className=" text-slate-600 text-sm flex">
          Plan: {props.name} - {format(props.updatedAt, "MMMM do, yyyy")}
          <Link href={`/plans/${props.id}`} className="pl-10">
            <ExternalLink className="h-6 w-6 pl-1" />{" "}
          </Link>
        </span>

        {props.note && <span className=" text-lg ">{props.note}</span>}
      </CollapsibleTrigger>
      {props.activityList.length && (
        <CollapsibleContent className=" mx-10 ">
          {props.activityList.map((activity) => (
            <span
              key={activity.id}
              className="flex flex-col p-4 rounded-r-lg rounded-bl-lg bg-slate-200 my-2"
            >
              <span className=" text-slate-600 text-sm">
                Activity: {activity.name} -{" "}
                {format(activity.updatedAt, "MMMM do, yyyy")}
              </span>
              {activity.note && (
                <span className=" text-lg ">{activity.note}</span>
              )}
            </span>
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
