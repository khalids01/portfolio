import type { ReactNode } from "react";
import type { ResumeData } from "@/features/resume/schema";

export function ContactLine({
  basics,
  className = "",
}: {
  basics: ResumeData["basics"];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-x-2 gap-y-1 text-[11px] leading-4 ${className}`}
    >
      <span>{basics.email}</span>
      {basics.location ? <span aria-hidden="true">·</span> : null}
      {basics.location ? <span>{basics.location}</span> : null}
      {basics.links.map((link) => (
        <span key={link.name} className="contents">
          <span aria-hidden="true">·</span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-current/30 underline-offset-2"
          >
            {link.name}
          </a>
        </span>
      ))}
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`border-b border-slate-300 pb-1 text-[12px] font-bold tracking-[0.08em] text-slate-900 ${className}`}
    >
      {children}
    </h2>
  );
}

export function ExperienceEntry({
  experience,
  compact = false,
}: {
  experience: ResumeData["experience"][number];
  compact?: boolean;
}) {
  return (
    <div className="resume-block space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[12px] font-bold tracking-[0.04em] text-slate-950">
          {experience.company}
        </h3>
        <span className="shrink-0 text-[10px] font-medium text-slate-600">
          {experience.start} — {experience.end}
        </span>
      </div>
      <p className="text-[11px] font-medium text-slate-700">
        {experience.role} · Remote
      </p>
      <ul
        className={`ml-4 list-disc text-slate-700 ${compact ? "space-y-0.5 text-[10.5px] leading-[1.4]" : "space-y-1 text-[11px] leading-[1.45]"}`}
      >
        {experience.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

export function EducationList({
  education,
  hideDates = false,
}: {
  education: ResumeData["education"];
  hideDates?: boolean;
}) {
  return (
    <div className="space-y-2">
      {education.map((item) => (
        <div
          className="resume-block"
          key={`${item.degree}-${item.institution}`}
        >
          <p className="text-[11px] font-semibold text-slate-900">
            {item.degree}
          </p>
          <p className="text-[10.5px] text-slate-600">
            {item.institution}
            {!hideDates && [item.start, item.end].filter(Boolean).length
              ? ` · ${[item.start, item.end].filter(Boolean).join(" — ")}`
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SkillsRows({ skills }: { skills: ResumeData["skills"] }) {
  return (
    <div className="space-y-1 text-[10.75px] leading-[1.45]">
      {skills.map((group) => (
        <p key={group.group}>
          <span className="mr-3 inline-block min-w-24 font-bold text-slate-900">
            {group.group}
          </span>
          {group.items.join(", ")}
        </p>
      ))}
    </div>
  );
}
