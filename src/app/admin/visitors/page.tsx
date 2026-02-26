import { VisitorsTable } from "@/features/analytics/components/visitors-table";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Visitors | Admin",
  description: "View visitor analytics and history.",
};

export default async function VisitorsPage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Visitors</h2>
      </div>
      <div className="grid gap-4">
        <VisitorsTable />
      </div>
    </div>
  );
}
