"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { useActivityStore } from "@/hooks/use-activity-store";
import { ActivityForm } from "@/app/(pages)/activities/(routes)/components/activity-form";


export const ActivityModal: React.FC= ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    activity,
    activityModalOpen,
    setActivityModalOpen,
    resetActivity,
  } = useActivityStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null;
  }
  const title = activity ? "Edit Activity" : "Create Activity";
  const description = activity ? "Edit a Activity." : "Add a new Activity";
  const onClose = () => {
    resetActivity();
    setActivityModalOpen(false);
  };


  return (
    <Modal
      title={title}
      description={description}
      isOpen={activityModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <ActivityForm />
      </div>
    </Modal>
  );
};
