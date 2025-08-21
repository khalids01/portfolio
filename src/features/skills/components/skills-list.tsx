"use client";
import { useState } from "react";
import { useAdminSkills } from "@/features/admin/skills/useAdminSkills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkillsList() {
  const { list, create, remove } = useAdminSkills();

  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | "">("");
  const [experienceMonths, setExperienceMonths] = useState<number | "">("");

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    create.mutate(
      {
        name: name.trim(),
        label: label || null,
        icon: icon || null,
        experienceYears: typeof experienceYears === "number" ? experienceYears : 0,
        experienceMonths: typeof experienceMonths === "number" ? experienceMonths : 0,
      },
      {
        onSuccess: () => {
          setName("");
          setLabel("");
          setIcon("");
          setExperienceYears("");
          setExperienceMonths("");
        },
      }
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., TypeScript" />
            </div>
            <div>
              <label className="text-sm font-medium">Label</label>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Display label (optional)" />
            </div>
            <div>
              <label className="text-sm font-medium">Icon URL</label>
              <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="https://... (optional)" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Years</label>
                <Input
                  type="number"
                  min={0}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Months</label>
                <Input
                  type="number"
                  min={0}
                  max={11}
                  value={experienceMonths}
                  onChange={(e) => setExperienceMonths(e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={create.isPending}>
                {create.isPending ? "Adding..." : "Add"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Skills ({list.data?.data.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {list.isLoading && <div>Loading...</div>}
            {list.data?.data.map((s) => (
              <div key={s.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="space-y-0.5">
                  <div className="font-medium">{s.label || s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.experienceYears ?? 0}y {s.experienceMonths ?? 0}m · {s.projects.length} project(s)
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Update flow can be added later */}
                  <Button variant="destructive" size="sm" disabled={remove.isPending} onClick={() => remove.mutate(s.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {!list.isLoading && (list.data?.data.length ?? 0) === 0 && <div className="text-sm">No skills yet.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
