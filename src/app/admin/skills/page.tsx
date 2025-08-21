import { SkillsList } from "@/features/skills/components/skills-list";

export default function AdminSkillsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
      <SkillsList />
    </div>
  );
}
