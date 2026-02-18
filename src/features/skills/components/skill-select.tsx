"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { useAdminSkills } from "@/features/admin/skills/useAdminSkills";
import type { Skill } from "../types";

interface SkillSelectProps {
  selectedSkillIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function SkillSelect({
  selectedSkillIds,
  onChange,
  placeholder = "Select skills...",
  className,
}: SkillSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { list } = useAdminSkills();
  const skills = list.data?.data || [];

  const handleUnselect = (id: string) => {
    onChange(selectedSkillIds.filter((s: string) => s !== id));
  };

  const selectedSkills = skills.filter((s: Skill) => selectedSkillIds.includes(s.id));

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 py-2 px-3"
          >
            <div className="flex flex-wrap gap-1">
              {selectedSkills.length > 0 ? (
                selectedSkills.map((skill: Skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="mr-1 mb-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(skill.id);
                    }}
                  >
                    {skill.name}
                    <X className="ml-1 h-3 w-3 hover:text-destructive cursor-pointer" />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {skills.map((skill: Skill) => (
                  <CommandItem
                    key={skill.id}
                    onSelect={() => {
                      const isSelected = selectedSkillIds.includes(skill.id);
                      if (isSelected) {
                        onChange(selectedSkillIds.filter((id) => id !== skill.id));
                      } else {
                        onChange([...selectedSkillIds, skill.id]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedSkillIds.includes(skill.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {skill.name}
                    {skill.category && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({skill.category})
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
