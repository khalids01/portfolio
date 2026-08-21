import type { ResumeData } from "@/features/resume/schema";
import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";

export function SeniorCompactLayout({ data }: { data: ResumeData }) {
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
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[12mm] text-slate-900 shadow-sm print:shadow-none">
        <header className="resume-block">
          <h1 className="text-[24px] font-bold">{basics.name}</h1>
          <div className="mt-1 flex items-baseline justify-between gap-3 border-b border-slate-800 pb-2">
            <p className="text-[12.5px] font-semibold">{basics.title}</p>
            <ContactLine
              basics={basics}
              className="justify-end text-slate-600"
            />
          </div>
        </header>
        <div className="mt-4 space-y-4">
          <section className="resume-section space-y-1">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[10.75px] leading-[1.45]">{summary}</p>
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
                <h3 className="text-[10.75px] font-bold">{item.name}</h3>
                <p className="text-[10.25px] leading-[1.35]">{item.desc}</p>
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
