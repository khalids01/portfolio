import { getResume } from "@/features/resume/data";
import { ResumeForm } from "@/features/admin/resume/components/resume-form";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminResumePage() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  const data = await getResume();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ResumeForm initialData={data} />
    </div>
  );
}
