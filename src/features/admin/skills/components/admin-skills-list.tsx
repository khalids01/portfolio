"use client";

import { useState } from "react";
import { useAdminSkills } from "../useAdminSkills";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { SkillForm } from "./skill-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SKILL_ICONS } from "@/constants/icons";
import Image from "next/image";

export function AdminSkillsList() {
  const { list, remove } = useAdminSkills();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
          </DialogHeader>
          <SkillForm
            skillId={editingId}
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.isLoading && <div>Loading skills...</div>}
        {list.data?.data.map((skill) => (
          <Card key={skill.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{skill.category}</Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  Order: {skill.order}
                </div>
              </div>
              <CardTitle className="mt-2 flex items-center gap-2">
                {skill.icon && (
                  <div className="relative h-6 w-6">
                    <Image
                      src={SKILL_ICONS[skill.icon] || skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain inverted-icon"
                    />
                  </div>
                )}
                {skill.name}
              </CardTitle>
              {skill.label && (
                <CardDescription>{skill.label}</CardDescription>
              )}
              <div className="font-mono text-xs text-muted-foreground">
                {skill.slug}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Level {skill.level}/10</span>
                </div>
                {skill.experienceYears ? (
                  <div className="text-muted-foreground">
                    {skill.experienceYears}y experience
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-1">
                {skill.projects.length > 0 ? (
                  <div className="text-xs text-muted-foreground w-full mb-1">Projects:</div>
                ) : null}
                {skill.projects.map(p => (
                  <Badge key={p.id} variant="secondary" className="text-[10px] px-1 py-0">
                    {p.title}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-end pt-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(skill.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm("Are you sure?")) remove.mutate(skill.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {!list.isLoading && list.data?.data.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No skills found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
