import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";
import { ResumeSheet } from "./shared/resume-sheet";
import type { ResumeLayoutProps } from "../../settings";

export function SeniorCompactLayout({ data, density, pageSize }: ResumeLayoutProps) {
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
        <header className="resume-block">
          <h1 className="text-[22pt] font-bold">{basics.name}</h1>
          <div className="mt-1 border-b border-slate-800 pb-2">
            <p className="text-[length:calc(var(--resume-body-size)*1.1)] font-semibold">{basics.title}</p>
            <ContactLine
              basics={basics}
              className="mt-2 text-slate-600"
            />
          </div>
        </header>
        <div className="mt-[var(--resume-section-gap)] space-y-[var(--resume-section-gap)]">
          <section className="resume-section space-y-1">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[length:var(--resume-body-size)] leading-[var(--resume-line-height)]">{summary}</p>
          </section>
          <section className="resume-section space-y-2">
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
            <SectionHeading>Selected Systems / Projects</SectionHeading>
            {projects.map((item) => (
              <div className="resume-block" key={item.name}>
                <h3 className="text-[length:var(--resume-body-size)] font-bold">{item.name}</h3>
                <p className="text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)]">{item.desc}</p>
              </div>
            ))}
          </section>
          <section className="resume-section space-y-1">
            <SectionHeading>Technical Expertise</SectionHeading>
            <SkillsRows skills={skills} />
          </section>
          <section className="resume-section space-y-1">
            <SectionHeading>Education</SectionHeading>
            <EducationList education={education} />
          </section>
          <section className="resume-section space-y-1">
            <SectionHeading>Languages</SectionHeading>
            <p className="text-[length:var(--resume-small-size)]">
              {languages
                .map((item) => `${item.name}: ${item.level}`)
                .join(" · ")}
            </p>
          </section>
        </div>
    </ResumeSheet>
  );
}
