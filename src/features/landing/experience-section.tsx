"use client";

import * as React from "react";
import type { ExperienceData } from "@/features/landing/data";
import { Briefcase, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function HighlightedText({ text }: { text: string }) {
  const keywords = [
    "Front-End", "Back-End", "Full-Stack", "Next.Js", "E-Commerce", "React", "TypeScript", "Node.js", 
    "DEX","Bun","elysia","Saas", "Engine",
    "Developer", "Engineer", "Database", "API", "UI/UX", "TailwindCSS", "Prisma", "Engineered", "WebSocket", "Pub", "Sub", "Fastify", "NextJS", "Tailwind", "Python", "AWS", "Docker", "Kubernetes", "Redis", "PostgreSQL", "JavaScript", "Optimization", "Whirlpool", "Solana", "Arbitrage", "Flash Loan", "Web3", "NextJS", "Tailwind", "Python", "AWS", "Docker", "Kubernetes", "Redis", "Mariadb"
  ].sort((a, b) => b.length - a.length);

  
  const regex = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => 
        keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="text-teal-600 dark:text-teal-400 font-medium">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ExperienceCard({ experience, index }: { experience: ExperienceData; index: number }) {
  const formatDate = (date: Date | null | undefined, current: boolean) => {
    if (!date) return "Present";
    if (current && !experience.endDate) return "Present";
    return format(date, "MMM yyyy");
  };

  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative"
    >
      {/* Timeline Thread */}
      <div className="absolute left-[-1.5rem] md:left-[-2.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/10 to-transparent hidden sm:block" />
      
      {/* Timeline Portal Dot */}
      <div className="absolute left-[-1.80rem] md:left-[-2.80rem] top-8 hidden sm:flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-teal-400 ring-4 ring-background z-10 group-hover:bg-teal-300 transition-colors duration-300 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5 md:p-7 backdrop-blur-md transition-all duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.03] hover:border-teal-500/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Decorative corner glow */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex flex-col gap-4">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-bold tracking-widest uppercase text-teal-400">
                <Calendar className="h-3 w-3" />
                {formatDate(experience.startDate, false)} — {formatDate(experience.endDate, experience.current)}
              </div>
              
              <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                {experience.role}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-teal-600 dark:text-teal-500" />
                  <span>{experience.company}</span>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-400">{experience.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden lg:flex shrink-0 mt-2">
              <div className="h-12 w-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-teal-500/40 group-hover:bg-teal-500/10 transition-all duration-300">
                <ArrowUpRight className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-4">
            {experience.description && (
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl font-light">
                <HighlightedText text={experience.description} />
              </div>
            )}

            {experience.highlights.length > 0 && (
              <div className="flex flex-col gap-0 pt-0">
                {experience.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="flex items-start gap-3 py-1 px-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group/highlight"
                  >
                    <div className="mt-[0.4rem] flex-shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500/50 group-hover/highlight:bg-teal-500 dark:group-hover/highlight:bg-teal-400 group-hover/highlight:scale-125 transition-all shadow-[0_0_8px_rgba(45,212,191,0.0)] group-hover/highlight:shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                    </div>
                    <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 group-hover/highlight:text-slate-900 dark:group-hover/highlight:text-slate-200 transition-colors leading-relaxed font-light">
                      <HighlightedText text={highlight.text} />
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ experiences }: { experiences: ExperienceData[] }) {
  if (!experiences.length) return null;

  return (
    <section id="experience" className="relative w-full overflow-hidden py-20 md:py-32">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          
          {/* Header Area */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-teal-500" />
              <span className="text-teal-600 dark:text-teal-400 font-bold tracking-[0.2em] uppercase text-xs">Journey</span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-teal-500" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-300 dark:from-teal-400 dark:to-teal-200">History</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
              A chronology of my professional experience, building scalable solutions across the stack.
            </p>
          </motion.div>

          {/* Main Experience Feed */}
          <div className="relative flex flex-col gap-6 md:gap-8 sm:pl-10 md:pl-0">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
