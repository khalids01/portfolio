import { getResumeRecord, listResumeMeta } from "@/features/resume/data";
import { ResumeView } from "@/features/resume/components/resume-view";
import { normalizeResumeLayoutId } from "@/features/resume/layouts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume | Abdullah Khalid",
  description: "Professional resume of Abdullah Khalid",
};

export const dynamic = "force-dynamic";

export default async function ResumeVariantPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ layout?: string }>;
}) {
  const [{ slug }, { layout }] = await Promise.all([params, searchParams]);

  try {
    const [record, variants] = await Promise.all([getResumeRecord(slug), listResumeMeta()]);
    const activeLayout = normalizeResumeLayoutId(layout, normalizeResumeLayoutId(record.defaultLayout));

    return (
      <main className="min-h-screen bg-slate-950 px-4 py-6 md:py-10 print:bg-white print:p-0">
        <ResumeView
          data={record.data}
          resumeSlug={record.slug}
          activeLayout={activeLayout}
          variants={variants}
        />
      </main>
    );
  } catch {
    notFound();
  }
}
