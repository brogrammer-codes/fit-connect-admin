"use client";
import { Heading } from "@/components/ui/heading";
import { Activity, Plan, PlanStatus } from "@prisma/client";
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
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { ActivityTable } from "./activity-table/activity-table";
import { columns } from "./activity-table/activity-column";
import { StatusPill } from "@/components/status-pill";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
});

type PlanFormValues = z.infer<typeof formSchema>;

interface PlanFormProps {
  initialData: Plan | null;
  initialActivityList: Activity[] | null;
}

export const PlanForm: React.FC<PlanFormProps> = ({
  initialData,
  initialActivityList,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState<Activity[] | []>([]);

  const messageCopy = useMemo(
    () => ({
      title: "Create plan",
      description: "Add a new plan",
      toastMessage: "Plan created.",
      action: "Create",
    }),
    []
  );
  const addActivity = () => {
    if (initialData) {
      let newActivity: Activity = {
        id: "",
        name: "",
        userId: "",
        description: "",
        parentActivityId: null,
        note: null,
        status: "DRAFT",
        videoUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        planId: initialData?.id
      }
      setActivityList([...activityList, newActivity])
    }
  }
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });
  useEffect(() => {
    if (initialData) {
      if (initialData.status === PlanStatus.DRAFT) {
        messageCopy.title = "Edit plan draft";
        messageCopy.description = "Edit your plan draft, this can be a bit more generic and you can customize it when you assign it to a client. ";
        messageCopy.toastMessage = "Plan Updated";
        messageCopy.action = "Save Changes";
      }
      if (initialData.status === PlanStatus.ASSIGNED) {

        messageCopy.title = "Edit Client plan";
        messageCopy.description = "Edit the plan assigned to the client";
        messageCopy.toastMessage = "Plan Updated";
        messageCopy.action = "Save Changes";
      }
    }
  }, [initialData, messageCopy]);

  useEffect(() => {
    if (initialActivityList) setActivityList([...initialActivityList]);
  }, [initialActivityList]);

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
      toast.success(messageCopy.toastMessage);
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
          <Heading title={messageCopy.title} description={messageCopy.description} />
          {initialData && <StatusPill status={initialData.status} />}
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
            {messageCopy.action}
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
      {initialData && (
        <>
          <Separator />
          <Button variant={'secondary'} onClick={addActivity}>Add Activity</Button>
          <ActivityTable data={activityList} columns={columns} />
        </>
      )}
    </>
  );
};
