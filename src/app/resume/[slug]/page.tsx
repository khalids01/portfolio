import { getResumeRecord } from "@/features/resume/data";
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
    const record = await getResumeRecord(slug);
    const activeLayout = normalizeResumeLayoutId(layout, normalizeResumeLayoutId(record.defaultLayout));

    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-10 print:bg-white print:p-0">
        <ResumeView
          data={record.data}
          resumeSlug={record.slug}
          activeLayout={activeLayout}
        />
      </main>
    );
  } catch {
    notFound();
  }
}
