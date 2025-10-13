"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ComponentType } from "react";
import {
  Code2,
  Boxes,
  Cpu,
  Database,
  Braces,
  Terminal,
  Cloud,
  GitBranch,
  Globe,
  FileCode2,
} from "lucide-react";

export type Skill = { name: string };

// Simple mapping of skill names to placeholder lucide icons
function iconForSkill(name: string): ComponentType<{ className?: string }> {
  const key = name.toLowerCase();
  if (/(js|javascript|ts|typescript|node)/.test(key)) return FileCode2;
  if (/(react|next)/.test(key)) return Boxes;
  if (/(css|tailwind|ui)/.test(key)) return Braces;
  if (/(db|sql|prisma|mongo|postgres)/.test(key)) return Database;
  if (/(cloud|aws|gcp|azure|vercel)/.test(key)) return Cloud;
  if (/(api|backend|server)/.test(key)) return Terminal;
  if (/(git|github|gitlab)/.test(key)) return GitBranch;
  if (/(web|three|threejs|r3f)/.test(key)) return Globe;
  if (/(rust|go|java|python)/.test(key)) return Cpu;
  return Code2;
}

export function SkillSphere({ skills }: { skills: Skill[] }) {
  const icons: Array<ComponentType<{ className?: string }>> = skills.length
    ? skills.map((s: Skill) => iconForSkill(s.name))
    : [Code2, Boxes, Database, Braces, Terminal, Cloud, GitBranch, Globe, Cpu, FileCode2];

  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % icons.length), 1600);
    return () => clearInterval(id);
  }, [icons.length]);

  const Active = icons[index];

  return (
    <div className="relative h-64 w-full md:h-80 lg:h-96 overflow-hidden rounded-2xl">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -inset-24 blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 20% 20%, rgba(99,102,241,0.25), transparent 60%)" }}
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-24 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 80% 30%, rgba(236,72,153,0.2), transparent 60%)" }}
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -inset-24 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 80%, rgba(168,85,247,0.2), transparent 60%)" }}
          animate={{ x: [0, 10, -30, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Bokeh orbs */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-white/8 blur-xl"
          style={{ width: 12 + (i % 4) * 6, height: 12 + (i % 4) * 6, left: `${(i * 97) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -10, 0], x: [0, 10, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}

      {/* Centerpiece tile */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="relative w-44 h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-[2rem] bg-gradient-to-br from-slate-900/70 to-slate-800/40 backdrop-blur-xl shadow-2xl border border-white/10"
          whileHover={{ rotateX: -3, rotateY: 3, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{ transformStyle: "preserve-3d", perspective: 900 }}
        >
          {/* rotating rings */}
          <motion.div
            className="pointer-events-none absolute -inset-3 rounded-[2.4rem] border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-6 rounded-[2.8rem] border border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />

          {/* glossy sweep */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-[2rem]"
            animate={{ backgroundPositionX: ["0%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundImage: "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
          />

          {/* icon */}
          <div className="relative z-10 h-full w-full grid place-items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Active className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-white/90" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.45)" }} />
    </div>
  );
}
