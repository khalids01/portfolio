"use client";

import type { ResumeData } from "../schema";
import type { ResumeMeta } from "../data";
import { RESUME_LAYOUTS, normalizeResumeLayoutId, type ResumeLayoutId } from "../layouts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Download, Github, Linkedin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ResumeView({
  data,
  resumeSlug,
  activeLayout,
  variants,
}: {
  data: ResumeData;
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
  variants: ResumeMeta[];
}) {
  const layout = normalizeResumeLayoutId(activeLayout);
  const SelectedLayout = getResumeLayout(layout);

  return (
    <>
      <ResumeToolbar resumeSlug={resumeSlug} activeLayout={layout} />
      <ResumeVariantSelector activeSlug={resumeSlug} activeLayout={layout} variants={variants} />
      <ResumeLayoutTabs activeLayout={layout} />
      <SelectedLayout data={data} />
    </>
  );
}

function ResumeVariantSelector({
  activeSlug,
  activeLayout,
  variants,
}: {
  activeSlug: string;
  activeLayout: ResumeLayoutId;
  variants: ResumeMeta[];
}) {
  const router = useRouter();

  function updateVariant(slug: string) {
    const params = new URLSearchParams({ layout: activeLayout });
    const href = slug === "default" ? `/resume?${params}` : `/resume/${slug}?${params}`;
    router.push(href);
  }

  return (
    <div className="no-print mx-auto mb-4 flex w-full max-w-[210mm] items-center gap-3">
      <label htmlFor="resume-variant" className="shrink-0 text-sm font-medium text-slate-400">
        Resume variant
      </label>
      <Select value={activeSlug} onValueChange={updateVariant}>
        <SelectTrigger id="resume-variant" className="w-full max-w-md bg-background/80">
          <SelectValue placeholder="Select a resume variant" />
        </SelectTrigger>
        <SelectContent>
          {variants.map((variant) => (
            <SelectItem key={variant.slug} value={variant.slug}>
              {variant.title}{variant.isDefault ? " (default)" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

type ResumeLayoutProps = {
  data: ResumeData;
};

function getResumeLayout(layout: ResumeLayoutId) {
  switch (layout) {
    case "europass-pro":
      return EuropassProResumeLayout;
    case "modern-sidebar":
      return ModernSidebarResumeLayout;
    case "ats-plain":
      return AtsPlainResumeLayout;
    case "classic":
    default:
      return ClassicResumeLayout;
  }
}

function ResumeToolbar({
  resumeSlug,
  activeLayout,
}: {
  resumeSlug: string;
  activeLayout: ResumeLayoutId;
}) {
  const pdfHref = `/resume.pdf?variant=${encodeURIComponent(resumeSlug)}&layout=${activeLayout}`;

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
          asChild
        >
          <a href={pdfHref}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>
    </div>
  );
}

function ResumeLayoutTabs({ activeLayout }: { activeLayout: ResumeLayoutId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateLayout(value: string) {
    const layout = normalizeResumeLayoutId(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("layout", layout);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="no-print mx-auto mb-6 w-full max-w-[210mm]">
      <Tabs value={activeLayout} onValueChange={updateLayout}>
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-md border bg-background/80 p-1 backdrop-blur md:grid-cols-4">
          {RESUME_LAYOUTS.map((layout) => (
            <TabsTrigger key={layout.id} value={layout.id} className="rounded-sm text-xs md:text-sm">
              {layout.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-slate-200 pb-1.5 text-[19px] font-bold">
      {children}
    </h2>
  );
}

function ResumeDateRange({ start, end }: { start?: string; end?: string }) {
  const range = [start, end].filter(Boolean).join(" — ");
  return range ? <p className="text-xs text-slate-400">{range}</p> : null;
}

function ClassicResumeLayout({ data }: ResumeLayoutProps) {
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
              <SectionTitle>Professional Summary</SectionTitle>
              <p className="text-[15px] leading-7 text-slate-600">
                {summary}
              </p>
            </section>

            <section className="resume-section space-y-4">
              <SectionTitle>Experience</SectionTitle>
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
              <SectionTitle>Selected Projects</SectionTitle>
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
              <SectionTitle>Skills</SectionTitle>
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
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="resume-block space-y-1">
                    <h3 className="text-sm font-bold">{edu.institution}</h3>
                    <p className="text-sm text-slate-600">{edu.degree}</p>
                    <ResumeDateRange start={edu.start} end={edu.end} />
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section space-y-3">
              <SectionTitle>Languages</SectionTitle>
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

function ContactLine({ data }: { data: ResumeData["basics"] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] leading-5 text-slate-600">
      <span>{data.email}</span>
      {data.location ? <span>{data.location}</span> : null}
      {data.links.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">
          {link.name}
        </a>
      ))}
    </div>
  );
}

function EuropassHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="resume-block flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      <h2 className="flex-1 border-b border-slate-300 pb-1 text-[15px] font-extrabold uppercase tracking-wide text-slate-950">
        {children}
      </h2>
    </div>
  );
}

function EuropassProResumeLayout({ data }: ResumeLayoutProps) {
  const { basics, summary, skills, experience, projects, education, languages } = data;

  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-0 text-slate-900 shadow-sm print:shadow-none">
        <header className="resume-block bg-slate-100 px-[12mm] py-8">
          <h1 className="text-[27px] font-extrabold leading-tight text-slate-800">{basics.name}</h1>
          <p className="mt-1 text-[15px] font-semibold text-slate-600">{basics.title}</p>
          <div className="mt-3">
            <ContactLine data={basics} />
          </div>
        </header>

        <div className="space-y-5 px-[12mm] py-7">
          <section className="resume-section space-y-2">
            <EuropassHeading>About Myself</EuropassHeading>
            <p className="pl-5 text-[13.5px] leading-5 text-slate-700">{summary}</p>
          </section>

          <section className="resume-section space-y-3">
            <EuropassHeading>Work Experience</EuropassHeading>
            <div className="space-y-4 pl-5">
              {experience.map((exp, index) => (
                <div key={index} className="resume-block space-y-1.5">
                  <p className="text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
                    {exp.start} - {exp.end}
                  </p>
                  <h3 className="text-[14.5px] font-extrabold uppercase text-slate-700">
                    {exp.role} <span className="font-semibold normal-case text-slate-500">{exp.company}</span>
                  </h3>
                  <ul className="ml-4 list-disc space-y-1 text-[13px] leading-5 text-slate-700">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section space-y-3">
            <EuropassHeading>Education & Training</EuropassHeading>
            <div className="space-y-3 pl-5">
              {education.map((edu, index) => (
                <div key={index} className="resume-block space-y-1">
                  {[edu.start, edu.end].filter(Boolean).length ? (
                    <p className="text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
                      {[edu.start, edu.end].filter(Boolean).join(" - ")}
                    </p>
                  ) : null}
                  <h3 className="text-[14px] font-extrabold uppercase text-slate-700">{edu.degree}</h3>
                  <p className="text-[13px] text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section space-y-3">
            <EuropassHeading>Skills</EuropassHeading>
            <div className="grid gap-2 pl-5 text-[13px] leading-5 text-slate-700">
              {skills.map((group) => (
                <p key={group.group}>
                  <span className="font-bold text-slate-700">{group.group}: </span>
                  {group.items.join(" | ")}
                </p>
              ))}
            </div>
          </section>

          <section className="resume-section space-y-3">
            <EuropassHeading>Projects</EuropassHeading>
            <div className="space-y-3 pl-5">
              {projects.map((project, index) => (
                <div key={index} className="resume-block space-y-1">
                  <h3 className="text-[14px] font-extrabold uppercase text-slate-700">{project.name}</h3>
                  <p className="text-[13px] leading-5 text-slate-700">{project.desc}</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-[12.5px] leading-5 text-slate-600">
                    {project.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section space-y-3">
            <EuropassHeading>Language Skills</EuropassHeading>
            <div className="pl-5 text-[13px] leading-5 text-slate-700">
              {languages.map((language) => (
                <p key={language.name}>
                  <span className="font-bold">{language.name}:</span> {language.level}
                </p>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

function ModernSidebarResumeLayout({ data }: ResumeLayoutProps) {
  const { basics, summary, skills, experience, projects, education, languages } = data;

  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto grid min-h-[297mm] w-[210mm] grid-cols-[68mm_1fr] bg-white text-slate-900 shadow-sm print:shadow-none">
        <aside className="bg-slate-900 px-7 py-9 text-white">
          <div className="resume-block space-y-2">
            <h1 className="text-[28px] font-extrabold leading-tight">{basics.name}</h1>
            <p className="text-[14px] font-medium leading-5 text-slate-300">{basics.title}</p>
          </div>

          <div className="mt-8 space-y-7">
            <section className="resume-block space-y-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Contact</h2>
              <div className="space-y-1.5 text-[12.5px] leading-5 text-slate-200">
                <p>{basics.email}</p>
                {basics.location ? <p>{basics.location}</p> : null}
                {basics.links.map((link) => (
                  <p key={link.name}>{link.name}</p>
                ))}
              </div>
            </section>

            <section className="resume-section space-y-4">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Skills</h2>
              {skills.map((group) => (
                <div key={group.group} className="resume-block space-y-1.5">
                  <h3 className="text-[12px] font-bold uppercase text-white">{group.group}</h3>
                  <p className="text-[12px] leading-5 text-slate-300">{group.items.join(", ")}</p>
                </div>
              ))}
            </section>

            <section className="resume-section space-y-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">Languages</h2>
              {languages.map((language) => (
                <p key={language.name} className="text-[12.5px] leading-5 text-slate-300">
                  <span className="font-semibold text-white">{language.name}</span> - {language.level}
                </p>
              ))}
            </section>
          </div>
        </aside>

        <main className="space-y-7 px-8 py-9">
          <section className="resume-block space-y-2">
            <h2 className="text-[17px] font-extrabold uppercase tracking-wide text-slate-950">Profile</h2>
            <p className="text-[13.5px] leading-6 text-slate-600">{summary}</p>
          </section>

          <section className="resume-section space-y-4">
            <h2 className="text-[17px] font-extrabold uppercase tracking-wide text-slate-950">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="resume-block border-l-2 border-slate-200 pl-4">
                <div className="flex justify-between gap-4">
                  <h3 className="text-[15px] font-bold text-slate-900">{exp.role}</h3>
                  <span className="shrink-0 text-[12px] text-slate-500">{exp.start} - {exp.end}</span>
                </div>
                <p className="text-[13px] font-semibold text-slate-600">{exp.company}</p>
                <ul className="mt-1.5 ml-4 list-disc space-y-1 text-[12.8px] leading-5 text-slate-600">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section space-y-4">
            <h2 className="text-[17px] font-extrabold uppercase tracking-wide text-slate-950">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="resume-block space-y-1">
                <h3 className="text-[14px] font-bold text-slate-900">{project.name}</h3>
                <p className="text-[12.8px] leading-5 text-slate-600">{project.desc}</p>
              </div>
            ))}
          </section>

          <section className="resume-section space-y-3">
            <h2 className="text-[17px] font-extrabold uppercase tracking-wide text-slate-950">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="resume-block">
                <h3 className="text-[13.5px] font-bold text-slate-900">{edu.degree}</h3>
                <p className="text-[12.8px] text-slate-600">
                  {edu.institution}{[edu.start, edu.end].filter(Boolean).length ? ` · ${[edu.start, edu.end].filter(Boolean).join(" - ")}` : ""}
                </p>
              </div>
            ))}
          </section>
        </main>
      </article>
    </div>
  );
}

function AtsPlainResumeLayout({ data }: ResumeLayoutProps) {
  const { basics, summary, skills, experience, projects, education, languages } = data;

  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <article className="resume-sheet mx-auto min-h-[297mm] w-[210mm] bg-white p-[14mm] text-slate-950 shadow-sm print:shadow-none">
        <header className="resume-block border-b border-slate-400 pb-3 text-center">
          <h1 className="text-[26px] font-bold leading-tight">{basics.name}</h1>
          <p className="mt-1 text-[14px]">{basics.title}</p>
          <p className="mt-2 text-[11.5px] leading-5">
            {[basics.email, basics.location, ...basics.links.map((link) => link.url)].filter(Boolean).join(" | ")}
          </p>
        </header>

        <div className="mt-5 space-y-5">
          <section className="resume-block space-y-1.5">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Summary</h2>
            <p className="text-[12.5px] leading-5">{summary}</p>
          </section>

          <section className="resume-section space-y-3">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="resume-block space-y-1">
                <div className="flex justify-between gap-4">
                  <h3 className="text-[13px] font-bold">{exp.company} - {exp.role}</h3>
                  <span className="shrink-0 text-[11.5px]">{exp.start} - {exp.end}</span>
                </div>
                <ul className="ml-4 list-disc space-y-0.5 text-[12px] leading-5">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section space-y-2">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Skills</h2>
            <div className="space-y-1 text-[12px] leading-5">
              {skills.map((group) => (
                <p key={group.group}>
                  <span className="font-bold">{group.group}: </span>
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </section>

          <section className="resume-section space-y-3 print:break-before-page">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="resume-block">
                <h3 className="text-[12.5px] font-bold">{project.name}</h3>
                <p className="text-[12px] leading-5">{project.desc}</p>
                <ul className="ml-4 list-disc space-y-0.5 text-[12px] leading-5">
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section space-y-2">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Education</h2>
            {education.map((edu, index) => (
              <p key={index} className="resume-block text-[12px] leading-5">
                <span className="font-bold">{edu.degree}</span>, {edu.institution}{[edu.start, edu.end].filter(Boolean).length ? `, ${[edu.start, edu.end].filter(Boolean).join(" - ")}` : ""}
              </p>
            ))}
          </section>

          <section className="resume-section space-y-1">
            <h2 className="border-b border-slate-300 text-[14px] font-bold uppercase">Languages</h2>
            <p className="text-[12px] leading-5">
              {languages.map((language) => `${language.name}: ${language.level}`).join(" | ")}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
