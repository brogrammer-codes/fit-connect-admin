"use client";

import { useEffect, useMemo, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { Client } from "@prisma/client";
import ClientPicker from "../client-picker";
import axios from "axios";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (clientId: string) => void;
  loading: boolean;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [clientList, setClientList] = useState<Client[] | []>([]);
  const [client, setClient] = useState<Client | null>(null)


  useEffect(() => {
    setIsMounted(true);
    const findClients = async () => await axios.get('/api/clients')
    findClients().then(({ data }) => setClientList([...data]))
  }, []);
  if (!isMounted) {
    return null;
  }

  const onClientSelect = (id: string) => {
    const selectedClient = clientList.find((c) => c.id === id)
    if (selectedClient) setClient(selectedClient)
  }


  return (
    <Modal
      title="Assign this Plan to a Client?"
      description="This will be added to the end of the plans the client has."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-y-2 flex flex-col items-center justify-end w-full">
        <ClientPicker items={clientList} currentClient={client} onClientSelect={onClientSelect} />
        {client ? <div> Do you want to assign this to {client.name}?</div> : null}
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {client ? (<Button disabled={loading} variant="outline" onClick={() => { onClose(); onConfirm(client.id) }}>
          Assign
        </Button>) : null}
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>

      </div>
    </Modal>
  );
};
