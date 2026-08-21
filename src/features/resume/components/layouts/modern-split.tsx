import type { ResumeData } from "@/features/resume/schema";
import {
  ContactLine,
  EducationList,
  ExperienceEntry,
  SectionHeading,
} from "./shared/resume-primitives";

export function ModernSplitLayout({ data }: { data: ResumeData }) {
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
      <article className="resume-sheet mx-auto grid min-h-[297mm] w-[210mm] grid-cols-[60mm_1fr] bg-white text-slate-900 shadow-sm print:shadow-none">
        <aside className="bg-slate-100 px-5 py-8">
          <h1 className="text-[22px] font-bold leading-tight">{basics.name}</h1>
          <p className="mt-1 text-[11px] font-medium text-slate-700">
            {basics.title}
          </p>
          <div className="mt-7 space-y-6">
            <section className="resume-block space-y-2">
              <SectionHeading>Contact</SectionHeading>
              <ContactLine
                basics={basics}
                className="block space-y-1 text-[10px] text-slate-700 [&>span]:block [&>span[aria-hidden=true]]:hidden"
              />
            </section>
            <section className="resume-section space-y-3">
              <SectionHeading>Skills</SectionHeading>
              {skills.map((group) => (
                <div className="resume-block" key={group.group}>
                  <h3 className="text-[10px] font-bold">{group.group}</h3>
                  <p className="text-[10px] leading-[1.45] text-slate-700">
                    {group.items.join(", ")}
                  </p>
                </div>
              ))}
            </section>
            <section className="resume-section space-y-2">
              <SectionHeading>Education</SectionHeading>
              <EducationList education={education} hideDates />
            </section>
            <section className="resume-section space-y-1">
              <SectionHeading>Languages</SectionHeading>
              {languages.map((item) => (
                <p className="text-[10px] text-slate-700" key={item.name}>
                  <strong>{item.name}</strong> · {item.level}
                </p>
              ))}
            </section>
          </div>
        </aside>
        <main className="space-y-6 px-7 py-8">
          <section className="resume-section space-y-2">
            <SectionHeading>Summary</SectionHeading>
            <p className="text-[11px] leading-[1.55] text-slate-700">
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
                <h3 className="text-[11px] font-bold">{item.name}</h3>
                <p className="text-[10.5px] leading-[1.45] text-slate-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>
        </main>
      </article>
    </div>
  );
}
