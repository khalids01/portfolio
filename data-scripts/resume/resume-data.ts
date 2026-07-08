import type { ResumeData } from "../../src/features/resume/schema";

const links = [
  { name: "GitHub", url: "https://github.com/khalids01" },
  { name: "LinkedIn", url: "https://linkedin.com/in/khalid87" },
];

const experience = [
  {
    company: "Interspeed",
    role: "Full-Stack TypeScript Developer",
    start: "2023-01",
    end: "Present",
    bullets: [
      "Built TypeScript-first trading engine components using Bun and Elysia.js across centralized and decentralized market data sources.",
      "Developed Sofilite LIMS with multi-role architecture, dynamic forms, and clinical/anatomical laboratory workflows.",
      "Implemented Redis pub/sub and WebSocket-based data flows for real-time arbitrage and market intelligence systems.",
      "Contributed to selected OpenEMR fork modernization work for clinician and patient workflows.",
    ],
  },
  {
    company: "Freelance / Contract",
    role: "Full-Stack Web Developer",
    start: "2020-01",
    end: "2023-01",
    bullets: [
      "Delivered 100+ client projects with consistent 5-star ratings.",
      "Built custom CMS dashboards, job platforms, and ecommerce systems using TypeScript, React, Next.js, and NestJS.",
      "Integrated payment gateways, third-party APIs, deployment workflows, and admin dashboards.",
    ],
  },
];

const education = [
  {
    institution: "Uttara University",
    degree: "B.Sc. in Computer Science & Engineering",
    start: "2024",
    end: "Present",
  },
  {
    institution: "Tangail Polytechnic Institute",
    degree: "Diploma in Computer Science & Engineering",
    start: "2019",
    end: "2023",
  },
];

const languages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Bangla", level: "Native" },
];

const projects = [
  {
    name: "Laboratory Information Management System",
    desc: "Enterprise LIMS for hospitals and diagnostic centers.",
    bullets: [
      "Built around 85% of the system over 2.5 years.",
      "Covered clinical/anatomical workflows, role-based access, dynamic forms, and reporting flows.",
    ],
    links: [],
  },
  {
    name: "Algorithmic Crypto Trading Platform",
    desc: "Market intelligence and algorithmic trading R&D platform.",
    bullets: [
      "Processed real-time exchange/DEX market data.",
      "Built arbitrage scanning and execution-safety logic with Redis and WebSockets.",
    ],
    links: [],
  },
  {
    name: "Job Posting Platforms",
    desc: "Production job-board applications for real business workflows.",
    bullets: [
      "Built public listings, dashboards, and deployment flows.",
      "Shipped commercially useful full-stack apps with live links available to add.",
    ],
    links: [],
  },
];

export function createResume(overrides: {
  title: string;
  summary: string;
  skills: ResumeData["skills"];
  experience?: ResumeData["experience"];
  projects?: ResumeData["projects"];
}): ResumeData {
  return {
    basics: {
      name: "Abdullah Khalid",
      title: overrides.title,
      email: "khalid.code03@gmail.com",
      location: "Dhaka, Bangladesh",
      links,
    },
    summary: overrides.summary,
    skills: overrides.skills,
    experience: overrides.experience ?? experience,
    projects: overrides.projects ?? projects,
    education,
    languages,
  };
}

export const fullStackSkills = [
  { group: "Backend", items: ["Node.js", "Bun", "Elysia.js", "Fastify", "NestJS", "Express.js"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "SvelteKit", "Tailwind CSS"] },
  { group: "Database & ORM", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "Prisma", "Drizzle"] },
  { group: "FinTech / Web3", items: ["Solana RPC", "Anchor", "Jupiter DEX Aggregator", "Binance API", "Web3.js"] },
  { group: "DevOps", items: ["AWS", "Docker", "CI/CD", "Linux Server Ops", "Grafana"] },
];

export const frontendSkills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "React Native", "SvelteKit", "Tailwind CSS"] },
  { group: "UI Engineering", items: ["Dashboard UX", "Forms", "State Management", "Performance Optimization"] },
  { group: "Backend Collaboration", items: ["REST APIs", "Node.js", "Prisma", "PostgreSQL"] },
  { group: "Delivery", items: ["Vercel", "CI/CD", "Production Debugging"] },
];

export const nodeSkills = [
  { group: "Backend", items: ["Node.js", "Bun", "Elysia.js", "Fastify", "NestJS", "Express.js"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "Prisma", "Drizzle"] },
  { group: "Architecture", items: ["REST APIs", "Microservices", "WebSockets", "Queues", "API Security"] },
  { group: "DevOps", items: ["AWS", "Docker", "Linux Server Ops", "Grafana", "CI/CD"] },
];
