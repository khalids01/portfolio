"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

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
import { SKILL_ICONS } from "@/constants/icons";

interface SkillIconSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SkillIconSelect({
  value,
  onChange,
  className,
}: SkillIconSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Filter out any icons that don't exist or have invalid paths if necessary
  // For now, we use all keys from SKILL_ICONS
  const iconKeys = Object.keys(SKILL_ICONS);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            {value ? (
              <>
                <div className="relative h-4 w-4">
                   <Image
                    src={SKILL_ICONS[value] || value}
                    alt={value}
                    fill
                    className="object-contain inverted-icon"
                  />
                </div>
                <span className="truncate">{value}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select icon...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search icons..." />
          <CommandList>
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup>
              {iconKeys.map((key) => (
                <CommandItem
                  key={key}
                  value={key}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === key ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <div className="relative h-4 w-4">
                      <Image
                        src={SKILL_ICONS[key]}
                        alt={key}
                        fill
                        className="object-contain inverted-icon"
                      />
                    </div>
                    <span>{key}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
