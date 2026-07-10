"use client";

import type { ResumeData } from "../schema";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download, Github, Linkedin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ResumeView({ data }: { data: ResumeData }) {
  return (
    <>
      <ResumeToolbar />
      <ClassicResumeLayout data={data} />
    </>
  );
}

function ResumeToolbar() {
  return (
    <div className="no-print mx-auto mb-6 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3">
      <Button variant="ghost" size="sm" asChild className="text-slate-500 hover:text-primary transition-colors">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="flex flex-wrap gap-3">
        <Button
          size="lg"
          className="rounded-full text-white! bg-slate-900! shadow-lg hover:shadow-xl transition-all"
          onClick={() => window.print()}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}

function ClassicResumeLayout({ data }: { data: ResumeData }) {
  const { basics, summary, skills, experience, projects, education, languages } = data;

  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[12mm] text-slate-900 shadow-sm print:shadow-none">
        <header className="resume-block mb-7">
          <div className="space-y-2">
            <h1 className="text-[34px] font-bold leading-tight tracking-tight">{basics.name}</h1>
            <p className="text-[19px] font-medium leading-snug text-slate-600">{basics.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[13px] leading-5 text-slate-500">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{basics.email}</span>
              </div>
              {basics.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{basics.location}</span>
                </div>
              )}
              <div className="flex gap-4">
                {basics.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-colors hover:text-primary"
                  >
                    {link.name === "GitHub" && <Github className="h-4 w-4" />}
                    {link.name === "LinkedIn" && <Linkedin className="h-4 w-4" />}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="resume-grid grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-9">
          <div className="space-y-8 md:col-span-2">
            <section className="resume-block space-y-3">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Professional Summary</h2>
              <p className="text-[15px] leading-7 text-slate-600">
                {summary}
              </p>
            </section>

            <section className="resume-section space-y-4">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Experience</h2>
              <div className="space-y-7">
                {experience.map((exp, idx) => (
                  <div key={idx} className="resume-block space-y-1.5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[17px] font-bold leading-snug">{exp.company}</h3>
                      <span className="shrink-0 text-[13px] text-slate-500">{exp.start} — {exp.end}</span>
                    </div>
                    <p className="text-[15px] font-medium leading-snug text-slate-600">{exp.role}</p>
                    <ul className="ml-4 list-outside list-disc space-y-1.5 text-[13.5px] leading-[1.45] text-slate-600">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section space-y-4">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Selected Projects</h2>
              <div className="space-y-5">
                {projects.map((proj, idx) => (
                  <div key={idx} className="resume-block space-y-1.5">
                    <h3 className="text-[16px] font-bold leading-snug">{proj.name}</h3>
                    <p className="text-[13.5px] leading-6 text-slate-600">{proj.desc}</p>
                    <ul className="ml-4 list-outside list-disc space-y-1 text-[13.5px] leading-[1.45] text-slate-600">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="resume-section space-y-5">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Skills</h2>
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="resume-block space-y-1.5">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">{skillGroup.group}</h3>
                  <div className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="rounded-sm bg-slate-50 px-1.5 py-0.5 text-[12.5px] font-medium leading-5 text-slate-600 ring-1 ring-inset ring-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="resume-section space-y-4">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Education</h2>
              <div className="space-y-3.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="resume-block space-y-1">
                    <h3 className="text-sm font-bold">{edu.institution}</h3>
                    <p className="text-sm text-slate-600">{edu.degree}</p>
                    <p className="text-xs text-slate-400">{edu.start} — {edu.end}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section space-y-3">
              <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between gap-4 text-sm">
                    <span className="text-left font-medium">{lang.name}</span>
                    <span className="text-right text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
