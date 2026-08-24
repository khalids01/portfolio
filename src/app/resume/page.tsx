import { getResumeRecord, listResumeMeta } from "@/features/resume/data";
import { ResumeView } from "@/features/resume/components/resume-view";
import { normalizeResumeLayoutId } from "@/features/resume/layouts";
import { normalizeResumeDensity, normalizeResumePageSize } from "@/features/resume/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Abdullah Khalid",
  description: "Professional resume of Abdullah Khalid - Full-Stack TypeScript Engineer",
};

export const dynamic = "force-dynamic";

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; density?: string; page?: string }>;
}) {
  const [{ layout, density, page }, record, variants] = await Promise.all([
    searchParams,
    getResumeRecord(),
    listResumeMeta(),
  ]);
  const activeLayout = normalizeResumeLayoutId(layout, normalizeResumeLayoutId(record.defaultLayout));
  const activeDensity = normalizeResumeDensity(density);
  const activePageSize = normalizeResumePageSize(page);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 md:py-10 print:bg-white print:p-0">
      <ResumeView
        data={record.data}
        resumeSlug={record.slug}
        activeLayout={activeLayout}
        activeDensity={activeDensity}
        activePageSize={activePageSize}
        variants={variants}
      />
    </main>
  );
}
