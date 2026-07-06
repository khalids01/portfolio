import { getResume } from "@/features/resume/data";
import { ResumeView } from "@/features/resume/components/resume-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Abdullah Khalid",
  description: "Professional resume of Abdullah Khalid - Full-Stack TypeScript Engineer",
};

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const data = await getResume();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-10 print:bg-white print:p-0">
      <ResumeView data={data} />
    </main>
  );
}
