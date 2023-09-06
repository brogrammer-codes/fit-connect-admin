
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { Tags } from "types/plan";
import { VideoIcon } from "lucide-react";
import { type Plan } from "types/client";

export const ActivityDisplay: React.FC<{ plan: Plan }> = ({
  plan
}) => {

  return (
    <div className="flex flex-col space-y-2">
      {plan.activityList.map((activity) => (
        <Card key={activity.id} className="rounded border-none bg-slate-300">
          <CardHeader>
            <CardTitle className="flex flex-row justify-between">
              <span className="pr-2 font-semibold">{activity.name}</span>
              {activity.videoUrl ? (
                <Link href={activity.videoUrl} target="_blank">
                  <VideoIcon />
                </Link>
              ) : null}
            </CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {(Object.keys(Tags) as Array<keyof typeof Tags>).map((tag) =>
                plan[Tags[tag]] && activity[Tags[tag]] ? (
                  <span key={`${tag}-${activity.id}`}>{`${plan[Tags[tag]]}: ${
                    activity[Tags[tag]]
                  }`}</span>
                ) : null,
              )}
            </div>
          </CardContent>
          <CardFooter>{activity.note}</CardFooter>
        </Card>
      ))}
    </div>
  );
};

