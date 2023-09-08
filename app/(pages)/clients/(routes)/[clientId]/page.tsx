import prismadb from "@/lib/prismadb";
import { ClientForm } from "../components/client-form";

import { ClientPlanDetails } from "../components/client-plan-details";

const ClientPage = async ({ params }: { params: { clientId: string } }) => {
  const client = await prismadb.client.findUnique({
    where: { id: params.clientId },
    include: { planList: { include: { activityList: true } } },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientForm initialData={client} />
        {client ? <ClientPlanDetails plans={client?.planList} /> : null}
      </div>
    </div>
  );
};
export default ClientPage;
