import prismadb from "@/lib/prismadb";
import { ClientDisplay } from "./components/client-display";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Clients() {
  const {userId} = auth()
  if(!userId) redirect('/')

  const clients = await prismadb.client.findMany({where: {userId: userId}})
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientDisplay clients={clients}/>
      </div>
    </div>
  );
}
