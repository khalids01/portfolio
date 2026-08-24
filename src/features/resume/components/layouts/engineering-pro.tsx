import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";
import { ResumeSheet } from "./shared/resume-sheet";
import type { ResumeLayoutProps } from "../../settings";

export function EngineeringProLayout({ data, density, pageSize }: ResumeLayoutProps) {
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
        <header className="resume-block border-l-4 border-sky-700 pl-4">
          <h1 className="text-[23pt] font-bold tracking-tight">
            {basics.name}
          </h1>
          <p className="text-[length:calc(var(--resume-body-size)*1.12)] font-medium text-slate-700">
            {basics.title}
          </p>
          <ContactLine basics={basics} className="mt-2 text-slate-600" />
        </header>
        <div className="mt-[var(--resume-section-gap)] space-y-[var(--resume-section-gap)]">
          <section className="resume-section space-y-2">
            <SectionHeading>Professional Summary</SectionHeading>
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
          <section className="resume-section space-y-2">
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
