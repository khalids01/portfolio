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
import { useAdminProjects } from "@/features/admin/projects/useAdminProjects";
import type { Project } from "@/features/projects/types";

interface ProjectSelectProps {
  selectedProjectIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function ProjectSelect({
  selectedProjectIds,
  onChange,
  placeholder = "Select projects...",
  className,
}: ProjectSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { list } = useAdminProjects();
  const projects = list.data?.data || [];

  const handleUnselect = (id: string) => {
    onChange(selectedProjectIds.filter((p: string) => p !== id));
  };

  const selectedProjects = projects.filter((p: Project) => selectedProjectIds.includes(p.id));

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
              {selectedProjects.length > 0 ? (
                selectedProjects.map((project: Project) => (
                  <Badge
                    key={project.id}
                    variant="secondary"
                    className="mr-1 mb-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnselect(project.id);
                    }}
                  >
                    {project.title}
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
            <CommandInput placeholder="Search projects..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {projects.map((project: Project) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => {
                      const isSelected = selectedProjectIds.includes(project.id);
                      if (isSelected) {
                        onChange(selectedProjectIds.filter((id) => id !== project.id));
                      } else {
                        onChange([...selectedProjectIds, project.id]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProjectIds.includes(project.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {project.title}
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
