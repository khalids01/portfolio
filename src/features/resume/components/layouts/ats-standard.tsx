import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";
import { ResumeSheet } from "./shared/resume-sheet";
import type { ResumeLayoutProps } from "../../settings";

export function AtsStandardLayout({ data, density, pageSize }: ResumeLayoutProps) {
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
    <ResumeSheet density={density} pageSize={pageSize} className="p-[var(--resume-page-padding)]">
      <header className="resume-block border-b-2 border-slate-700 pb-3">
        <h1 className="text-[22pt] font-bold leading-tight">{basics.name}</h1>
        <p className="mt-0.5 text-[length:calc(var(--resume-body-size)*1.1)] font-medium">{basics.title}</p>
        <ContactLine basics={basics} className="mt-2 text-slate-700" />
      </header>
      <div className="mt-[var(--resume-section-gap)] space-y-[var(--resume-section-gap)]">
        <section className="resume-section space-y-1.5">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-[length:var(--resume-body-size)] leading-[var(--resume-line-height)]">{summary}</p>
        </section>
        <section className="resume-section space-y-2">
          <SectionHeading>Technical Skills</SectionHeading>
          <SkillsRows skills={skills} />
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
              <p className="text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)]">{item.desc}</p>
              <ul className="ml-4 list-disc text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)]">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="resume-section space-y-2">
          <SectionHeading>Education</SectionHeading>
          <EducationList education={education} />
        </section>
        <section className="resume-section space-y-1">
          <SectionHeading>Languages</SectionHeading>
          <p className="text-[length:var(--resume-small-size)]">
            {languages.map((item) => `${item.name}: ${item.level}`).join(" · ")}
          </p>
        </section>
      </div>
    </ResumeSheet>
  );
}
