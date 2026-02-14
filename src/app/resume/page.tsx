import { getResume } from "@/features/resume/data";
import { ResumeView } from "@/features/resume/components/resume-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Abdullah Khalid",
  description: "Professional resume of Abdullah Khalid - Full-Stack TypeScript Engineer",
};

export default async function ResumePage() {
  const data = await getResume();

  return (
    <main className="min-h-screen bg-slate-50 md:py-12">
      <ResumeView data={data} />
    </main>
  );
}
