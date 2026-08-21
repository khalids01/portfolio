import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";
import { ResumeSheet } from "./shared/resume-sheet";
import type { ResumeLayoutProps } from "../../settings";

export function EuProfessionalLayout({ data, density, pageSize }: ResumeLayoutProps) {
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
        <header className="resume-block border-b border-slate-400 pb-3">
          <h1 className="text-[22pt] font-semibold">{basics.name}</h1>
          <p className="mt-1 text-[length:calc(var(--resume-body-size)*1.08)] text-slate-700">{basics.title}</p>
          <ContactLine basics={basics} className="mt-2 text-slate-600" />
        </header>
        <div className="mt-[var(--resume-section-gap)] space-y-[var(--resume-section-gap)]">
          <section className="resume-section space-y-2">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Profile
            </SectionHeading>
            <p className="text-[length:var(--resume-body-size)] leading-[var(--resume-line-height)] text-slate-700">
              {summary}
            </p>
          </section>
          <section className="resume-section space-y-3">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Professional experience
            </SectionHeading>
            {experience.map((item) => (
              <ExperienceEntry
                key={`${item.company}-${item.role}`}
                experience={item}
                compact
              />
            ))}
          </section>
          <section className="resume-section space-y-2">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Selected projects
            </SectionHeading>
            {projects.map((item) => (
              <div className="resume-block" key={item.name}>
                <h3 className="text-[length:var(--resume-body-size)] font-semibold">{item.name}</h3>
                <p className="text-[length:var(--resume-small-size)] leading-[var(--resume-line-height)] text-slate-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>
          <section className="resume-section space-y-2">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Technical skills
            </SectionHeading>
            <SkillsRows skills={skills} />
          </section>
          <section className="resume-section space-y-2">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Education
            </SectionHeading>
            <EducationList education={education} hideDates />
          </section>
          <section className="resume-section space-y-1">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Languages
            </SectionHeading>
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
