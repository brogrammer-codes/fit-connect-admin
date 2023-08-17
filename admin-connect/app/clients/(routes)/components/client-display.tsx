"use client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Client } from "@prisma/client";

interface ClientDisplayInterface {
  clients: Client[];
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
      <div className="flex items-center justify-between">
        {
          clients.length ? <div> Client Table</div> : <div> You do not have any clients right now, try making one! </div>
        }
      </div>
    </div>
  );
};
