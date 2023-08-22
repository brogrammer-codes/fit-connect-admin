import prismadb from "@/lib/prismadb";
import { ClientDisplay } from "./components/client-display";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ClientColumn } from "./components/columns";
import { format } from "date-fns";

export default async function Clients() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const clients = await prismadb.client.findMany({ where: { userId: userId }, include: { planList: true } });
  const formattedClients: ClientColumn[] = clients.map((client) => ({
    id: client.id,
    name: client.name,
    createdAt: format(client.createdAt, "MMMM do, yyyy"),
    email: client.email,
    plans: client.planList.length
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientDisplay clients={formattedClients} />
      </div>
    </div>
  );
}
