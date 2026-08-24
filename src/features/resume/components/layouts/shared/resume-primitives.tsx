import type { ReactNode } from "react";
import type { ResumeData } from "@/features/resume/schema";

export function ContactLine({
  basics,
  className = "",
}: {
  basics: ResumeData["basics"];
  className?: string;
}) {
  const displayUrl = (url: string) => url.replace(/^https?:\/\/(?:www\.)?/, "").replace(/\/$/, "");

  return (
    <div
      className={`flex flex-wrap gap-x-2 gap-y-1 text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)] ${className}`}
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
            {displayUrl(link.url)}
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
      className={`border-b border-slate-300 pb-1 text-[length:calc(var(--resume-body-size)*1.16)] font-bold tracking-[0.08em] text-slate-900 ${className}`}
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
    <div className="resume-block space-y-[calc(var(--resume-section-gap)/3)]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[length:calc(var(--resume-body-size)*1.08)] font-bold tracking-[0.04em] text-slate-950">
          {experience.company}
        </h3>
        <span className="shrink-0 text-[length:var(--resume-small-size)] font-medium text-slate-600">
          {experience.start} — {experience.end}
        </span>
      </div>
      <p className="text-[length:var(--resume-body-size)] font-medium text-slate-700">
        {experience.role} · Remote
      </p>
      <ul
        className={`ml-4 list-disc text-slate-700 ${compact ? "space-y-0.5 text-[length:var(--resume-small-size)]" : "space-y-1 text-[length:var(--resume-body-size)]"} leading-[var(--resume-line-height)]`}
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
    <div className="space-y-[calc(var(--resume-section-gap)/2)]">
      {education.map((item) => (
        <div
          className="resume-block"
          key={`${item.degree}-${item.institution}`}
        >
          <p className="text-[length:var(--resume-body-size)] font-semibold text-slate-900">
            {item.degree}
          </p>
          <p className="text-[length:var(--resume-small-size)] text-slate-600">
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
    <div className="grid grid-cols-[minmax(7rem,max-content)_minmax(0,1fr)] gap-x-3 gap-y-1 text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)]">
      {skills.map((group) => (
        <div className="contents" key={group.group}>
          <span className="font-bold text-slate-900">{group.group}</span>
          <span>{group.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}
