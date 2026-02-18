import { AdminSkillsList } from "@/features/admin/skills/components/admin-skills-list";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function SkillsPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="text-muted-foreground">
          Manage your technical skills and expertise.
        </p>
      </div>
      <AdminSkillsList />
    </div>
  );
}

