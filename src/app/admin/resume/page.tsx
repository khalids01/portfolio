import { getResumeRecord, listResumeMeta } from "@/features/resume/data";
import { ResumeForm } from "@/features/admin/resume/components/resume-form";
import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminResumePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    redirect("/");
  }

  const { slug } = await searchParams;
  const [record, variants] = await Promise.all([
    getResumeRecord(slug),
    listResumeMeta(),
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ResumeForm
        initialRecord={{
          slug: record.slug,
          title: record.title,
          targetRole: record.targetRole,
          isDefault: record.isDefault,
          data: record.data,
        }}
        variants={variants}
      />
    </div>
  );
}
