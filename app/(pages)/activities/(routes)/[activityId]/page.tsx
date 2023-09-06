import prismadb from "@/lib/prismadb";
import { ActivityForm } from "../components/activity-form";


const ClientPage = async ({
  params,
}: {
  params: { activityId: string };
}) => {
  const activity = await prismadb.activity.findUnique({where: {id: params.activityId}})
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityForm initialData={activity}/>
      </div>
    </div>
  );
};
export default ClientPage;
