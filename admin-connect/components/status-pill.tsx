import { cn } from "@/lib/utils";
import { ActivityStatus, PlanStatus } from "@prisma/client";

interface StatusPillInterface {
  status: PlanStatus | ActivityStatus;
}
// const ActivityStatus  = {
//   "DRAFT": "Draft",
//   "IN_PLAN": "In Plan",
//   "ASSIGNED": "Assigned",
//   "COMPLETE": "Complete",
//   "DISABLED": "Disabled",
// }

export const StatusPill: React.FC<StatusPillInterface> = ({ status }) => {
  let bgColor = "bg-red-500";
  switch (status) {
    case "DRAFT":
      bgColor = "bg-amber-500";
      break;
    case "IN_PLAN":
      bgColor = "bg-emerald-600";
      break;
    default:
      break;
  }
  return <div className={cn("w-4 h-4 rounded-full", bgColor)} />;
};
