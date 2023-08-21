"use client";
import { Heading } from "@/components/ui/heading";
import { Activity, Plan } from "@prisma/client";
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
import { Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
});

type PlanFormValues = z.infer<typeof formSchema>;

interface PlanFormProps {
  initialData: Plan | null;
}

export const PlanForm: React.FC<PlanFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState<Activity[] | []>([])
  const title = initialData ? "Edit plan" : "Create plan";
  const description = initialData ? "Edit a plan." : "Add a new plan";
  const toastMessage = initialData ? "Plan updated." : "Plan created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: PlanFormValues) => {

    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/plans/${params.planId}`, data);
        router.refresh();
      } else {
        const response = await axios.post("/api/plans", data);
        router.push(`/plans/${response.data.id}`);
      }
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/plans/${params.planId}`);
      router.refresh();
      router.push("/plans");
      toast.success("Plan deleted.");
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
        <div className="flex flex-row space-x-4">
          <Heading title={title} description={description} />
          {initialData && <span>{initialData?.status}</span>}
        </div>
        <div className="flex flex-row space-x-3">
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
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
                      placeholder="Plan Name"
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
                      placeholder="Any extra details you want to add for the plan..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Separator />
    </>
  );
};
