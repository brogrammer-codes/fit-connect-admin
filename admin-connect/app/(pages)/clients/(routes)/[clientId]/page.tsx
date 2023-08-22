import prismadb from "@/lib/prismadb";
import { ClientForm } from "../components/client-form";
import { DataTable } from "@/components/ui/data-table";
import { PlanColumn, columns } from "@/app/(pages)/plans/(routes)/components/plan-table/plan-columns";
import { format } from "date-fns";


const ClientPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const client = await prismadb.client.findUnique({ where: { id: params.clientId }, include: { planList: { include: { activityList: true } } } })
  const formattedPlans: PlanColumn[] = client?.planList ? client.planList.map((plan) => ({
    id: plan.id,
    name: plan.name,
    status: plan.status,
    createdAt: format(plan.createdAt, "MMMM do, yyyy"),
    activityList: plan.activityList,
  })) : [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientForm initialData={client} />
        {
          client ? (<DataTable columns={columns} data={formattedPlans} filterKey="name" />) : null
        }
        
      </div>
    </div>
  );
};
export default ClientPage;
