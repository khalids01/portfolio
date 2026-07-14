import { getResumeRecord } from "@/features/resume/data";
import { ResumeView } from "@/features/resume/components/resume-view";
import { normalizeResumeLayoutId } from "@/features/resume/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Abdullah Khalid",
  description: "Professional resume of Abdullah Khalid - Full-Stack TypeScript Engineer",
};

export const dynamic = "force-dynamic";

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string }>;
}) {
  const [{ layout }, record] = await Promise.all([
    searchParams,
    getResumeRecord(),
  ]);
  const activeLayout = normalizeResumeLayoutId(layout, normalizeResumeLayoutId(record.defaultLayout));

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 md:py-10 print:bg-white print:p-0">
      <ResumeView
        data={record.data}
        resumeSlug={record.slug}
        activeLayout={activeLayout}
      />
    </main>
  );
}
