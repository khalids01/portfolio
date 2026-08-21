import type { ResumeData } from "@/features/resume/schema";
import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";

export function EngineeringProLayout({ data }: { data: ResumeData }) {
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
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[13mm] text-slate-900 shadow-sm print:shadow-none">
        <header className="resume-block border-l-4 border-sky-700 pl-4">
          <h1 className="text-[29px] font-bold tracking-tight">
            {basics.name}
          </h1>
          <p className="text-[14px] font-medium text-slate-700">
            {basics.title}
          </p>
          <ContactLine basics={basics} className="mt-2 text-slate-600" />
        </header>
        <div className="mt-5 space-y-5">
          <section className="resume-section space-y-2">
            <SectionHeading>Professional Summary</SectionHeading>
            <p className="text-[11.5px] leading-[1.55] text-slate-700">
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
                <h3 className="text-[11.5px] font-bold">{item.name}</h3>
                <p className="text-[10.75px] leading-[1.45] text-slate-700">
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
            <p className="text-[10.75px]">
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
