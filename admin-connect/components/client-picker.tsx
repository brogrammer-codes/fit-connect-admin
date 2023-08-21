"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, User2 } from "lucide-react";

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
import { Client } from "@prisma/client";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CLientSwitcherProps extends PopoverTriggerProps {
  items: Client[];
  currentClient: Client | null;
  onClientSelect: (id: string) => void
}

export default function ClientPicker({
  className,
  items = [],
  currentClient,
  onClientSelect
}: CLientSwitcherProps) {
  const params = useParams();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));


  const [open, setOpen] = React.useState<boolean>(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <User2 className="mr-2 h-4 w-4" />
          {currentClient?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search clients..." />
            <CommandEmpty>Client</CommandEmpty>
            <CommandGroup heading="Clients">
              {formattedItems.map((client) => (
                <CommandItem
                  key={client.value}
                  onSelect={() => { setOpen(false); onClientSelect(client.value) }}
                  className="text-sm"
                >
                  <User2 className="mr-2 h-4 w-4" />
                  {client.label}
                  {currentClient?.id === client.value && (
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