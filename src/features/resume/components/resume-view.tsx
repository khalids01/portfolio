"use client";

import type { ResumeData } from "../schema";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download, Github, Linkedin, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ResumeView({ data }: { data: ResumeData }) {
  const { basics, summary, skills, experience, projects, education, languages } = data;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white text-slate-900 shadow-sm min-h-screen print:max-w-none print:p-0">
      <div className="no-print mb-8">
        <Button variant="ghost" size="sm" asChild className="text-slate-500 hover:text-primary transition-colors">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{basics.name}</h1>
          <p className="text-xl text-slate-600 font-medium">{basics.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 pt-2">
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
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  {link.name === "GitHub" && <Github className="h-4 w-4" />}
                  {link.name === "LinkedIn" && <Linkedin className="h-4 w-4" />}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="no-print flex gap-3">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full shadow-sm hover:shadow-md transition-all"
            onClick={() => window.print()}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
            <a href="/resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {/* Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold border-b pb-2">Professional Summary</h2>
            <p className="text-slate-600 leading-relaxed">
              {summary}
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg">{exp.company}</h3>
                    <span className="text-sm text-slate-500">{exp.start} — {exp.end}</span>
                  </div>
                  <p className="text-slate-600 font-medium">{exp.role}</p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600 text-sm">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-8">
            <h2 className="text-xl font-bold border-b pb-2">Selected Projects</h2>
            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-lg">{proj.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{proj.desc}</p>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600 text-sm">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-12">
          {/* Skills */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">Skills</h2>
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">{skillGroup.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-bold text-sm">{edu.institution}</h3>
                  <p className="text-slate-600 text-sm">{edu.degree}</p>
                  <p className="text-slate-400 text-xs">{edu.start} — {edu.end}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between text-sm gap-4">
                  <span className="font-medium text-left">{lang.name}</span>
                  <span className="text-slate-500 text-right">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
