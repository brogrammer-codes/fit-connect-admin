"use client";
import { Heading } from "@/components/ui/heading";
import { Client } from "@prisma/client";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
  email: z.string().min(0),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  initialData: Client | null;
}

export const ClientForm: React.FC<ClientFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit client" : "Create client";
  const description = initialData ? "Edit a client." : "Add a new client";
  const toastMessage = initialData ? "Client updated." : "Client created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      email: "",
    },
  });
  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/clients/${params.clientId}`, data);
        router.refresh();
      } else {
        const response = await axios.post("/api/clients", data);
        router.push(`/clients/${response.data.id}`);
      }
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || ''
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/clients/${params.clientId}`);
      router.refresh();
      router.push("/clients");
      toast.success("Client deleted.");
    } catch (error: any) {
      toast.error("Could not delete client");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <div className="flex space-x-3">
            <Button size="sm" variant={'link'} onClick={() => window.open(`${clientUrl}/client/${initialData.id}`)}>
            View Client Page  <ExternalLink className="h-5 w-5 pl-1" />
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Client Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Client email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Any extra details you want to add for the client..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
