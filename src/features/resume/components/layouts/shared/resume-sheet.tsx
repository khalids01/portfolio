import type { ReactNode } from "react";
import {
  resumeSheetStyle,
  type ResumeDensity,
  type ResumePageSize,
} from "@/features/resume/settings";

export function ResumeSheet({
  density,
  pageSize,
  className = "",
  children,
}: {
  density: ResumeDensity;
  pageSize: ResumePageSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="resume-preview-sheet w-full overflow-x-auto overscroll-x-contain print:overflow-visible">
      <article
        className={`resume-sheet mx-auto bg-white text-slate-900 shadow-sm print:shadow-none ${className}`}
        style={resumeSheetStyle(density, pageSize)}
      >
        {children}
      </article>
    </div>
  );
}
