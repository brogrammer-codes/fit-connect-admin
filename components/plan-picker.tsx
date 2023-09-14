"use client";

import * as React from "react";
import { Check, ChevronsUpDown, User2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plan } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface PlanSwitcherProps extends PopoverTriggerProps {
  items: Plan[];
  currentPlan: Plan | null;
  onPlanSelect: (id: string) => void
}

export default function PlanPicker({
  className,
  items = [],
  currentPlan,
  onPlanSelect
}: PlanSwitcherProps) {

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));


  const [open, setOpen] = React.useState<boolean>(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a plan"
          className={cn(" justify-between w-full", className)}
        >
          <User2 className="mr-2 h-4 w-4" />
          {currentPlan?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search plan..." />
            <CommandEmpty>Plan</CommandEmpty>
            <CommandGroup heading="Plans">
              {formattedItems.map((plan) => (
                <CommandItem
                  key={plan.value}
                  onSelect={() => { setOpen(false); onPlanSelect(plan.value) }}
                  className="text-sm"
                >
                  <User2 className="mr-2 h-4 w-4" />
                  {plan.label}
                  {currentPlan?.id === plan.value && (
                    <Check className={cn("ml-auto h-4 w-4 opacity-100")} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}