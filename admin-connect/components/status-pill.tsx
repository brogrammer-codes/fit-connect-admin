import { cn } from "@/lib/utils";
import { ActivityStatus, PlanStatus } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
    case "ASSIGNED":
      bgColor = "bg-sky-500";
      break;
    case "IN_PLAN":
      bgColor = "bg-emerald-600";
      break;
    default:
      break;
  }
  return (
    <Popover>
      <PopoverTrigger><div className={cn("w-4 h-4 rounded-full", bgColor)} /></PopoverTrigger>
      <PopoverContent>{status}</PopoverContent>
    </Popover>

  );
};
