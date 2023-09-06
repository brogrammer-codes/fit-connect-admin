"use client";

import * as React from "react";
import { Check, ChevronsUpDown, DumbbellIcon, PlusCircle, User2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { Activity } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import axios from "axios";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ActivityPickerProps extends PopoverTriggerProps {
  currentActivity: Activity;
  onActivitySelect: (activity: Activity) => void;
}

export default function ActivityPicker({
  className,
  onActivitySelect,
  currentActivity,
}: ActivityPickerProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activityDraftList, setActivityDraftList] = React.useState<
    Activity[] | []
  >([]);
  const formattedItems = activityDraftList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const onListClick = (id: string) => {
    const act = activityDraftList.find((activity) => activity.id === id)
    if(act) {
      onActivitySelect(act)
      setOpen(false);
    }
  } 
  const getDraftActivityList = async () => {
    const {data} = await axios.get('/api/activities')
    if(data) setActivityDraftList([...data])
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select an activity"
          className={cn("w-full justify-between", className)}
        >
          <DumbbellIcon className="mr-2 h-4 w-4" />
          {currentActivity?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search activities..." onFocus={getDraftActivityList}/>
            <CommandEmpty>Activity</CommandEmpty>
            <CommandGroup heading="Activities">
              {formattedItems.map((activity) => (
                <CommandItem
                  key={activity.value}
                  onSelect={() => {
                    
                    onListClick(activity.value);
                  }}
                  className="text-sm"
                >
                  <DumbbellIcon className="mr-2 h-4 w-4" />
                  {activity.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
