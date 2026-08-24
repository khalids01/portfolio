import {
  ContactLine,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";
import { ResumeSheet } from "./shared/resume-sheet";
import type { ResumeLayoutProps } from "../../settings";

export function ModernSplitLayout({ data, density, pageSize }: ResumeLayoutProps) {
  const {
    basics,
    summary,
    skills,
    experience,
    projects,
    education,
    languages,
  } = data;
  return (
    <ResumeSheet density={density} pageSize={pageSize} className="grid grid-cols-[54mm_minmax(0,1fr)] overflow-hidden">
        <aside className="bg-slate-900 px-[calc(var(--resume-page-padding)*0.65)] py-[var(--resume-page-padding)] text-slate-200">
          <h1 className="text-[20pt] font-bold leading-tight text-white">{basics.name}</h1>
          <p className="mt-2 text-[length:var(--resume-small-size)] font-medium leading-[var(--resume-line-height)] text-slate-300">
            {basics.title}
          </p>
          <div className="mt-[calc(var(--resume-section-gap)*2)] space-y-[calc(var(--resume-section-gap)*1.4)]">
            <section className="resume-block space-y-2">
              <SectionHeading className="border-slate-600 text-white">Contact</SectionHeading>
              <ContactLine
                basics={basics}
                className="block space-y-1 break-all text-slate-300 [&>span]:block [&>span[aria-hidden=true]]:hidden"
              />
            </section>
            <section className="resume-section space-y-2">
              <SectionHeading className="border-slate-600 text-white">Education</SectionHeading>
              {education.map((item) => (
                <div className="resume-block" key={`${item.degree}-${item.institution}`}>
                  <p className="text-[length:var(--resume-small-size)] font-semibold text-white">{item.degree}</p>
                  <p className="mt-1 text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)] text-slate-300">{item.institution}</p>
                </div>
              ))}
            </section>
            <section className="resume-section space-y-1">
              <SectionHeading className="border-slate-600 text-white">Languages</SectionHeading>
              {languages.map((item) => (
                <p className="text-[length:var(--resume-small-size)] text-slate-300" key={item.name}>
                  <strong>{item.name}</strong> · {item.level}
                </p>
              ))}
            </section>
          </div>
        </aside>
        <main className="space-y-[var(--resume-section-gap)] p-[var(--resume-page-padding)]">
          <section className="resume-section space-y-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[length:var(--resume-body-size)] leading-[var(--resume-line-height)] text-slate-700">
              {summary}
            </p>
          </section>
          <section className="resume-section space-y-3">
            <SectionHeading>Experience</SectionHeading>
            {experience.map((item) => (
              <ExperienceEntry
                key={`${item.company}-${item.role}`}
                experience={item}
                compact
              />
            ))}
          </section>
          <section className="resume-section space-y-2">
            <SectionHeading>Selected Projects</SectionHeading>
            {projects.map((item) => (
              <div className="resume-block" key={item.name}>
                <h3 className="text-[length:var(--resume-body-size)] font-bold">{item.name}</h3>
                <p className="text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)] text-slate-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>
          <section className="resume-section space-y-2">
            <SectionHeading>Technical Skills</SectionHeading>
            <SkillsRows skills={skills} />
          </section>
        </main>
    </ResumeSheet>
  );
}
