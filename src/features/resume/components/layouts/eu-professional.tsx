import type { ResumeData } from "@/features/resume/schema";
import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";

export function EuProfessionalLayout({ data }: { data: ResumeData }) {
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
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[15mm] text-slate-900 shadow-sm print:shadow-none">
        <header className="resume-block border-b border-slate-400 pb-3">
          <h1 className="text-[24px] font-semibold">{basics.name}</h1>
          <p className="mt-1 text-[12px] text-slate-700">{basics.title}</p>
          <ContactLine basics={basics} className="mt-2 text-slate-600" />
        </header>
        <div className="mt-5 space-y-5">
          <section className="resume-section space-y-2">
            <SectionHeading className="font-semibold normal-case tracking-normal">
              Profile
            </SectionHeading>
            <p className="text-[11px] leading-[1.55] text-slate-700">
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
                <h3 className="text-[11px] font-semibold">{item.name}</h3>
                <p className="text-[10.5px] leading-[1.45] text-slate-700">
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
            <p className="text-[10.5px]">
              {languages
                .map((item) => `${item.name}: ${item.level}`)
                .join(" · ")}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
