"use client";

import * as React from "react";
import type { ExperienceData } from "@/features/landing/data";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function ExperienceCard({ experience, index }: { experience: ExperienceData; index: number }) {
  const formatDate = (date: Date | null | undefined, current: boolean) => {
    if (!date) return "Present";
    if (current && !experience.endDate) return "Present";
    return format(date, "MMM yyyy");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline line for mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />
      
      {/* Timeline dot for mobile */}
      <div className="absolute left-[-5px] top-8 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background md:hidden" />

      <div className="group relative rounded-3xl bg-muted/30 p-6 md:p-8 hover:bg-muted/50 transition-colors duration-500 border border-border/50">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
              <div className="flex items-center gap-2 text-lg font-medium text-primary">
                <Briefcase className="h-4 w-4" />
                <span>{experience.company}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground bg-background/50 rounded-full px-4 py-2 border border-border/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {formatDate(experience.startDate, false)} - {formatDate(experience.endDate, experience.current)}
                </span>
              </div>
              {experience.location && (
                <>
                  <span className="hidden md:inline text-border">|</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{experience.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>
          )}

          {/* Highlights */}
          {experience.highlights.length > 0 && (
            <ul className="space-y-3">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{highlight.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ experiences }: { experiences: ExperienceData[] }) {
  if (!experiences.length) return null;

  return (
    <section id="experience" className="container mx-auto px-3 py-20 md:py-32">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Section header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Work Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            My professional journey and key accomplishments
          </motion.p>
        </div>

        {/* Experience timeline */}
        <div className="space-y-8 md:space-y-12 relative">
          {/* Timeline line for desktop */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block opacity-20" />

          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
