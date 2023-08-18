"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Client } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ClientColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";

interface ClientDisplayInterface {
  clients: ClientColumn[];
}

export const ClientDisplay: React.FC<ClientDisplayInterface> = ({
  clients,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Clients (${clients.length})`}
          description="Your client list, add a new one or edit existing ones here."
        />

        <Button onClick={() => router.push(`/clients/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={clients} filterKey="name" />
    </div>
  );
};
