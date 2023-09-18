"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useActivityStore } from "@/hooks/use-activity-store";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
  videoUrl: z.string().min(0),
});

type ActivityFormValues = z.infer<typeof formSchema>;


export const ActivityForm: React.FC = ({ }) => {

  const router = useRouter();
  const {
    activityLoading,
    activity,
    setActivityModalOpen,
    resetActivity,
    setActivityLoading,
  } = useActivityStore();
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      videoUrl: "",
    },
  });


  useEffect(() => {
    if (activity) {
      form.setValue("name", activity.name);
      form.setValue("description", activity.description);
      form.setValue("videoUrl", activity.videoUrl);
    }
    return () => {
      form.reset();
    };
  }, [activity, form]);

  const action = activity ? "Save" : "Create";
  const onClose = () => {
    resetActivity();
    setActivityModalOpen(false);
  };
  const onSubmit = async (data: ActivityFormValues) => {
    try {
      setActivityLoading(true);

      if (activity) {
        await axios.patch(`/api/activities/${activity.id}`, data);
        onClose();
      } else {
        await axios.post("/api/activities", data);
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      router && router.refresh();
      onClose();
      setActivityLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={activityLoading}
                    placeholder="Activity Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={activityLoading}
                    placeholder="Activity Video Url"
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
                    disabled={activityLoading}
                    placeholder="Any extra details you want to add for the activity..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={activityLoading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};
