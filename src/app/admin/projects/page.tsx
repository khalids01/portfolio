import { AdminProjectsList } from "@/features/admin/projects/components/admin-projects-list";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage your portfolio projects and their associations.
        </p>
      </div>
      <AdminProjectsList />
    </div>
  );
}

