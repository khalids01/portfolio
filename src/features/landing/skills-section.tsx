"use client";

import * as React from "react";
import type { SkillData } from "@/features/landing/data";
import { Code2, Database, Cloud, Terminal, Monitor, Layers, Shield, Cpu, Globe, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { getSkillColor, normalizeSkillIcon } from "@/constants/icons";
import Image from "next/image";

const categoryIcons: Record<string, React.ElementType> = {
  "Languages": Code2,
  "Frontend": Monitor,
  "Backend": Layers,
  "Database & Data": Database,
  "Database & ORM": Database,
  "DevOps & Cloud": Cloud,
  "Tools & Others": Terminal,
  "Other": Terminal,
  "FinTech / Blockchain": Wallet,
  "AI Tools & Capabilities": Cpu,
  "Engineering": Cpu,
  "Security": Shield,
  "Cloud": Globe,
};

export function SkillsSection({ skills }: { skills: SkillData[] }) {
  // Group skills by category
  const groupedSkills = React.useMemo(() => {
    return skills.reduce((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, SkillData[]>);
  }, [skills]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="container mx-auto px-3 py-20 md:py-32">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            A comprehensive toolkit for building modern, scalable applications
          </motion.p>
        </div>

        {/* Skills grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <motion.div
                key={category}
                variants={item}
                className="group relative rounded-3xl bg-muted/30 p-8 hover:bg-muted/50 transition-colors duration-500 border border-border/50"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative space-y-6">
                  {/* Category header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-xl">{category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => {
                      const iconPath = normalizeSkillIcon(skill?.icon);
                      const brandColor = getSkillColor(skill.name);
                      return (
                        <div
                          key={skill.id}
                          style={{ "--brand-color": brandColor } as React.CSSProperties}
                          className="group/skill flex items-center gap-2 rounded-xl bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground ring-1 ring-inset ring-border transition-all hover:text-foreground hover:ring-[var(--brand-color)]/50 hover:scale-105 cursor-default hover:shadow-[0_0_15px_-3px_var(--brand-color)]"
                        >
                          {iconPath && (
                            <div className="relative w-4 h-4 transition-all duration-300 group-hover/skill:drop-shadow-[0_0_3px_var(--brand-color)]">
                              <Image
                                src={iconPath}
                                alt={skill.name}
                                fill
                                className={`object-contain transition-all duration-300 ${
                                  ["next.js", "express", "fastify", "prisma", "typeorm", "vercel", "rust", "kubernetes"].some(base => 
                                    skill.name.toLowerCase().includes(base)
                                  ) ? "dark:invert" : ""
                                }`}
                              />
                            </div>
                          )}
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
