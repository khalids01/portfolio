import { AdminCategoriesList } from "@/features/admin/categories/components/admin-categories-list";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Create and reorder categories for projects, experience, education, and
          skills.
        </p>
      </div>
      <AdminCategoriesList />
    </div>
  );
}
