"use client";

import axios from "axios";
import { useState } from "react";
import {
  Copy,
  CopyIcon,
  Edit,
  MoreHorizontal,
  Trash,
  User2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { PlanColumn } from "./plan-columns";
import { ClientModal } from "@/components/modals/client-modal";
import { PlanStatus } from "@prisma/client";

interface CellActionProps {
  data: PlanColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/plans/${data.id}`);
      toast.success("Plan deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Could not delete plan");
    } finally {
      setDeleteAlertOpen(false);
      setLoading(false);
    }
  };

  const onClientConfirm = async (clientId: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/clients/${clientId}/assign/${data.id}`
      );
      router.push(`/plans/${response.data.id}`);
    } catch (error) {
      toast.error("Could not assign plan to client");
    } finally {
      setClientModalOpen(false);
      setLoading(false);
    }
  };
  const onPlanCopy =async () => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/plans/${data.id}/clone`)
      router.push(`/plans/${response.data.id}`);

    } catch (error) {
      toast.error("Could not clone plan");
    }finally {
      setLoading(false);
    }
  }
  return (
    <>
      <AlertModal
        isOpen={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <ClientModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onConfirm={onClientConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/plans/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />{" "}
            {data.status === PlanStatus.COMPLETE ? "View" : "Update"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onPlanCopy}>
            <CopyIcon className="mr-2 h-4 w-4" /> {data.status === PlanStatus.DRAFT ? "Copy Draft" : "Create Draft Copy"}
          </DropdownMenuItem>
          {data.status === PlanStatus.DRAFT && (
            <DropdownMenuItem onClick={() => setClientModalOpen(true)}>
              <User2 className="mr-2 h-4 w-4 text-green-800" /> Assign to Client
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setDeleteAlertOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-700" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
