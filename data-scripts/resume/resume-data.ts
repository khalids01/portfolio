import type { ResumeData } from "../../src/features/resume/schema";

const links = [
  { name: "GitHub", url: "https://github.com/khalids01" },
  { name: "LinkedIn", url: "https://linkedin.com/in/khalid87" },
];

const education: ResumeData["education"] = [
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

const languages: ResumeData["languages"] = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Bangla", level: "Native" },
];

const freelanceExperience = (bullets: string[]): ResumeData["experience"][number] => ({
  company: "Freelance / Contract",
  role: "Full-Stack Web Developer",
  start: "Jan 2020",
  end: "Jan 2023",
  bullets,
});

const interspeedExperience = (
  role: string,
  bullets: string[],
): ResumeData["experience"][number] => ({
  company: "Interspeed",
  role,
  start: "Jan 2023",
  end: "Present",
  bullets,
});

export const balancedExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Owned approximately 85% of a private enterprise LIMS over 2.5 years, delivering multi-role clinical and anatomical laboratory workflows, dynamic forms, reporting, and access control.",
    "Engineered TypeScript services for a crypto market-intelligence R&D platform, ingesting real-time data from centralized exchanges and Solana DEXs with Bun, Elysia.js, Redis, and WebSockets.",
    "Designed arbitrage scanning and execution-safety logic that evaluated fees, slippage, latency, and order-book conditions before identifying actionable signals.",
    "Contributed targeted API and interface modernization to an OpenEMR fork, improving selected clinician and patient workflows within a mature healthcare codebase.",
  ]),
  freelanceExperience([
    "Delivered 100+ client projects with consistent 5-star ratings across SaaS, ecommerce, job platforms, CMS dashboards, and business applications.",
    "Built end-to-end applications with TypeScript, React, Next.js, NestJS, relational databases, payment gateways, and third-party APIs.",
    "Deployed and maintained client applications on AWS and Vercel, handling production troubleshooting and ongoing improvements.",
  ]),
];

export const fullStackExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Delivered approximately 85% of an enterprise LIMS over 2.5 years, spanning data models, Fastify APIs, Next.js interfaces, role-based access, dynamic forms, and laboratory reporting workflows.",
    "Built real-time market-data and arbitrage R&D features across centralized exchanges and Solana DEXs using TypeScript, Bun, Elysia.js, Redis pub/sub, and WebSockets.",
    "Connected operational workflows to MariaDB and PostgreSQL data layers and built monitoring views with Grafana and AWS Athena.",
    "Modernized selected patient and clinician workflows in an OpenEMR fork through targeted frontend and REST API improvements.",
  ]),
  freelanceExperience([
    "Completed 100+ client projects with consistent 5-star ratings, taking products from requirements and UI implementation through APIs, integrations, and deployment.",
    "Built CMS dashboards, job platforms, and multi-vendor ecommerce systems with React, Next.js, NestJS, and relational databases.",
    "Integrated payment gateways and third-party services and maintained production applications on AWS and Vercel.",
  ]),
];

export const typescriptExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Designed TypeScript-first services and application modules across HealthTech and FinTech R&D products using Next.js, Fastify, Bun, Elysia.js, Prisma, and relational databases.",
    "Owned approximately 85% of an enterprise LIMS over 2.5 years, translating complex laboratory rules into maintainable APIs, data models, dynamic forms, and permission-aware workflows.",
    "Implemented event-driven market-data flows with Redis pub/sub and WebSockets across centralized exchanges and Solana DEX integrations.",
    "Developed fee-, slippage-, and latency-aware arbitrage analysis while keeping exchange integrations and execution checks modular.",
  ]),
  freelanceExperience([
    "Delivered 100+ client projects with consistent 5-star ratings, building reusable full-stack features across SaaS, ecommerce, job platforms, and internal dashboards.",
    "Developed typed frontend-to-backend workflows with React, Next.js, NestJS, database-backed APIs, payment integrations, and third-party services.",
    "Managed production deployments and maintenance on AWS and Vercel for remote client engagements.",
  ]),
];

export const nodeExperience: ResumeData["experience"] = [
  interspeedExperience("Backend-Focused Full-Stack TypeScript Developer", [
    "Engineered TypeScript backend services with Bun, Elysia.js, and Fastify for healthcare workflows and real-time crypto market-intelligence R&D.",
    "Built Redis pub/sub and WebSocket pipelines that ingested live order books from Binance, KuCoin, Coinbase, and Solana DEXs.",
    "Implemented arbitrage analysis and execution-safety checks for fees, slippage, latency, and configurable trading thresholds.",
    "Designed APIs, MariaDB data models, permission rules, and dynamic workflow services while owning approximately 85% of an enterprise LIMS over 2.5 years.",
    "Integrated Grafana dashboards with AWS Athena to support operational monitoring and historical analysis.",
  ]),
  freelanceExperience([
    "Delivered 100+ client projects with consistent 5-star ratings, including API-driven SaaS, ecommerce, CMS, and job-platform backends.",
    "Built services with Node.js, NestJS, relational and document databases, payment gateways, and third-party APIs.",
    "Deployed and maintained applications on AWS and Vercel, resolving production issues across application and infrastructure layers.",
  ]),
];

export const frontendExperience: ResumeData["experience"] = [
  interspeedExperience("Frontend-Leaning Full-Stack TypeScript Developer", [
    "Built complex Next.js interfaces for an enterprise LIMS, including multi-role dashboards, dynamic forms, patient and sample workflows, and clinical reporting flows.",
    "Owned approximately 85% of the LIMS over 2.5 years, connecting responsive application workflows to Fastify APIs and MariaDB-backed business rules.",
    "Developed real-time dashboards and data views for crypto market-intelligence R&D using TypeScript and WebSocket-driven updates.",
    "Modernized selected clinician and patient interfaces in an OpenEMR fork while preserving behavior in a mature legacy codebase.",
  ]),
  freelanceExperience([
    "Delivered 100+ client projects with consistent 5-star ratings, creating responsive storefronts, dashboards, CMS interfaces, and job platforms.",
    "Built reusable React and Next.js features for product, order, content, administration, and payment workflows.",
    "Collaborated across APIs, databases, deployments, and production debugging to deliver complete features for remote clients.",
  ]),
];

export const limsProject: ResumeData["projects"][number] = {
  name: "Laboratory Information Management System (LIMS)",
  desc: "Private enterprise HealthTech platform for hospitals and diagnostic laboratories.",
  bullets: [
    "Owned and delivered approximately 85% of the system over 2.5 years using Next.js, Fastify, TypeScript, and MariaDB.",
    "Implemented multi-role access, dynamic forms, patient and sample flows, clinical and anatomical laboratory workflows, and reporting automation.",
  ],
  links: [],
};

export const cryptoProject: ResumeData["projects"][number] = {
  name: "Algorithmic Crypto Market Intelligence Platform",
  desc: "R&D platform for real-time market ingestion, arbitrage analysis, and execution-aware trading automation.",
  bullets: [
    "Integrated live order-book data from centralized exchanges and Solana DEXs through WebSockets and Redis pub/sub.",
    "Built cross-exchange opportunity scanning with fee, slippage, latency, and execution-threshold checks.",
  ],
  links: [],
};

export const jobPlatformsProject: ResumeData["projects"][number] = {
  name: "Production Job Platforms",
  desc: "Commercial job-posting applications supporting real business recruitment workflows.",
  bullets: [
    "Delivered public job discovery, listing management, administration dashboards, and production deployment flows.",
    "Built complete features across responsive Next.js interfaces, backend services, and database-backed workflows.",
  ],
  links: [],
};

export const ecommerceProject: ResumeData["projects"][number] = {
  name: "Ecommerce Applications",
  desc: "Production commerce systems for client and business-owned retail workflows.",
  bullets: [
    "Built storefront, product, order, dashboard, payment, and third-party integration workflows.",
    "Delivered applications used for real sales and day-to-day business operations.",
  ],
  links: [],
};

export const emrProject: ResumeData["projects"][number] = {
  name: "OpenEMR Workflow Modernization",
  desc: "Targeted modernization of clinician and patient workflows in a mature OpenEMR fork.",
  bullets: [
    "Improved selected React interfaces and REST API integrations while working within a large PHP and MySQL codebase.",
    "Preserved established EMR behavior while incrementally improving usability and maintainability.",
  ],
  links: [],
};

export function createResume(overrides: {
  title: string;
  summary: string;
  skills: ResumeData["skills"];
  experience?: ResumeData["experience"];
  projects: ResumeData["projects"];
}): ResumeData {
  return {
    basics: {
      name: "Abdullah Khalid",
      title: overrides.title,
      email: "khalid.code03@gmail.com",
      location: "Dhaka, Bangladesh (Remote)",
      links,
    },
    summary: overrides.summary,
    skills: overrides.skills,
    experience: overrides.experience ?? balancedExperience,
    projects: overrides.projects,
    education,
    languages,
  };
}

export const fullStackSkills: ResumeData["skills"] = [
  { group: "Languages", items: ["TypeScript", "JavaScript"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "SvelteKit", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Bun", "Fastify", "NestJS", "Elysia.js", "REST APIs"] },
  { group: "Data", items: ["PostgreSQL", "MariaDB", "MongoDB", "Redis", "Prisma", "Drizzle"] },
  { group: "Cloud & Delivery", items: ["AWS", "Docker", "CI/CD", "Linux", "Vercel", "Grafana"] },
];

export const typescriptSkills: ResumeData["skills"] = [
  { group: "Core", items: ["TypeScript", "JavaScript", "System Design", "Clean Architecture"] },
  { group: "Applications", items: ["React", "Next.js", "Node.js", "Bun", "Fastify", "NestJS", "Elysia.js"] },
  { group: "Data & Realtime", items: ["PostgreSQL", "MariaDB", "Redis", "Prisma", "Drizzle", "WebSockets"] },
  { group: "Delivery", items: ["AWS", "Docker", "CI/CD", "Linux", "Grafana"] },
];

export const frontendSkills: ResumeData["skills"] = [
  { group: "Core Frontend", items: ["TypeScript", "React", "Next.js", "JavaScript", "Tailwind CSS"] },
  { group: "Application UI", items: ["Responsive UI", "Dashboards", "Dynamic Forms", "State Management", "Performance Optimization"] },
  { group: "Cross-Platform", items: ["React Native", "SvelteKit"] },
  { group: "Integration", items: ["REST APIs", "WebSockets", "Node.js", "Prisma", "PostgreSQL"] },
  { group: "Delivery", items: ["Vercel", "AWS", "CI/CD", "Production Debugging"] },
];

export const nodeSkills: ResumeData["skills"] = [
  { group: "Backend", items: ["TypeScript", "Node.js", "Bun", "Fastify", "NestJS", "Elysia.js", "Express.js"] },
  { group: "APIs & Realtime", items: ["REST APIs", "WebSockets", "Redis Pub/Sub", "API Security", "Third-Party Integrations"] },
  { group: "Data", items: ["PostgreSQL", "MariaDB", "MongoDB", "Redis", "Prisma", "Drizzle"] },
  { group: "Cloud & Operations", items: ["AWS", "Docker", "Linux", "CI/CD", "Grafana"] },
];
