import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ActivityColumn } from "./components/columns";
import { ActivityDisplay } from "./components/activity-display";

export default async function Clients() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const activityList = await prismadb.activity.findMany({ where: { userId: userId, status: 'DRAFT' } });
  
  const formattedActivityList: ActivityColumn[] = activityList.map((client) => ({
    id: client.id,
    name: client.name,
    createdAt: format(client.createdAt, "MMMM do, yyyy"),
    videoUrl: client.videoUrl,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityDisplay activityList={formattedActivityList}/>
      </div>
    </div>
  );
}
