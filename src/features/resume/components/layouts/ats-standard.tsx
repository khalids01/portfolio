import type { ResumeData } from "@/features/resume/schema";
import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
  SkillsRows,
} from "./shared/resume-primitives";

export function AtsStandardLayout({ data }: { data: ResumeData }) {
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
    <Sheet>
      <header className="resume-block border-b-2 border-slate-700 pb-3">
        <h1 className="text-[25px] font-bold leading-tight">{basics.name}</h1>
        <p className="mt-0.5 text-[13px] font-medium">{basics.title}</p>
        <ContactLine basics={basics} className="mt-2 text-slate-700" />
      </header>
      <div className="mt-4 space-y-4">
        <section className="resume-section space-y-1.5">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-[11px] leading-[1.45]">{summary}</p>
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
              <h3 className="text-[11px] font-bold">{item.name}</h3>
              <p className="text-[10.5px] leading-[1.4]">{item.desc}</p>
              <ul className="ml-4 list-disc text-[10.5px] leading-[1.4]">
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
          <p className="text-[10.5px]">
            {languages.map((item) => `${item.name}: ${item.level}`).join(" · ")}
          </p>
        </section>
      </div>
    </Sheet>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[14mm] text-slate-950 shadow-sm print:shadow-none">
        {children}
      </article>
    </div>
  );
}
