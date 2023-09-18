import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ActivityColumn } from "./components/columns";
import { ActivityDisplay } from "./components/activity-display";
import { ActivityModal } from "@/components/modals/activity-modal";

export default async function Clients() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const activityList = await prismadb.activity.findMany({ where: { userId: userId, status: 'DRAFT' } });
  
  const formattedActivityList: ActivityColumn[] = activityList.map((activity) => ({
    id: activity.id,
    name: activity.name,
    createdAt: format(activity.createdAt, "MMMM do, yyyy"),
    videoUrl: activity.videoUrl,
    description: activity.description,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityModal />
        <ActivityDisplay activityList={formattedActivityList}/>
      </div>
    </div>
  );
}
