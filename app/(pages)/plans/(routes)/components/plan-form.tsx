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
import { usePlanStore } from "@/hooks/use-plan-store";
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
  tag_1: z.string().min(0),
  tag_2: z.string().min(0),
  tag_3: z.string().min(0),
  tag_4: z.string().min(0),
  tag_5: z.string().min(0),
  tag_6: z.string().min(0),
});

type PlanFormValues = z.infer<typeof formSchema>;

export const PlanForm: React.FC = ({}) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams()
  const { plan, activityList } = usePlanStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const newClientId = searchParams.get("clientId")
  // const [activityList, setActivityList] = useState<Activity[] | []>([]);

  const messageCopy = useMemo(
    () => ({
      title: "Create plan",
      description: "Add a new plan",
      toastMessage: "Plan created.",
      action: "Create",
    }),
    []
  );
  const addActivity = async () => {
    if (plan) {
      await axios.post(`/api/plans/${plan.id}/activity`);
      router.refresh();
    }
  };

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: plan || {
      name: "",
      description: "",
      tag_1: "Weight",
      tag_2: "Reps",
      tag_3: "Sets",
      tag_4: "Time",
      tag_5: "Intensity",
      tag_6: "Rest",
    },
  });
  useEffect(() => {
    if (plan) form.reset(plan);
    else form.reset({ name: "", description: "" });
  }, [form, form.reset, plan]);

  useEffect(() => {
    if (plan) {
      if (plan.status === PlanStatus.DRAFT) {
        messageCopy.title = "Edit plan draft";
        messageCopy.description =
          "Edit your plan draft, this can be a bit more generic and you can customize it when you assign it to a client. ";
        messageCopy.toastMessage = "Plan Updated";
        messageCopy.action = "Save Changes";
      }
      if (plan.status === PlanStatus.ASSIGNED) {
        messageCopy.title = "Edit Client plan";
        messageCopy.description = "Edit the plan assigned to the client";
        messageCopy.toastMessage = "Plan Updated";
        messageCopy.action = "Save Changes";
      }
      if (plan.status === PlanStatus.COMPLETE) {
        messageCopy.title = "Review Completed Plan";
        messageCopy.description = "A client finished this workout and has completed it.";
        messageCopy.toastMessage = "Plan Updated";
        messageCopy.action = "Save Changes";
      }
    }
  }, [plan, messageCopy]);

  const onSubmit = async (data: PlanFormValues) => {
    try {
      setLoading(true);
      if (plan) {
        await axios.patch(`/api/plans/${params.planId}`, data);
        router.refresh();
      } else {
        const response = await axios.post("/api/plans", {...data, clientId: newClientId});
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
      toast.error("Could not delete Plan");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  console.log();
  
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
          <Heading
            title={messageCopy.title}
            description={messageCopy.description}
          />
          {plan && <StatusPill status={plan.status} />}
        </div>
        <div className="flex flex-row space-x-3">
          {plan && (
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
          <div className="flex flex-col">

          <span className=" text-xl font-semibold">Plan Tags</span>
          <span className=" text-sm text-slate-700">Variables used for your workout plan, they are set to the default tags but feel free to update them.</span>
          </div>
          <Separator />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="tag_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Weight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Reps"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Sets"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag_4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 4</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Time"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag_5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 5</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Rest"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag_6"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag 6</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Other"
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
      {plan && (
        <>
          <Separator />
          <Button variant={"secondary"} onClick={addActivity}>
            Add Activity
          </Button>
          <ActivityTable data={activityList} columns={columns} plan={plan} />
        </>
      )}
    </>
  );
};
