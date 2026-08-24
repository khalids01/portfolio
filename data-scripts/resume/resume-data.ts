import type { ResumeData } from "../../src/features/resume/schema";

const links = [
  { name: "GitHub", url: "https://github.com/khalids01" },
  { name: "LinkedIn", url: "https://linkedin.com/in/khalid87" },
];

const education: ResumeData["education"] = [
  { institution: "Tangail Polytechnic Institute", degree: "Diploma in Computer Science & Engineering" },
];

const languages: ResumeData["languages"] = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Bangla", level: "Native" },
];

const freelanceExperience = (bullets: string[]): ResumeData["experience"][number] => ({
  company: "Freelance / Contract",
  role: "Web Designer & Web Developer",
  start: "2020",
  end: "Feb 2023",
  bullets,
});

const interspeedExperience = (role: string, bullets: string[]): ResumeData["experience"][number] => ({
  company: "Interspeed",
  role,
  start: "Jun 2023",
  end: "Present",
  bullets,
});

export const balancedExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Owned approximately 85% of an enterprise Laboratory Information Management System over 2.5 years, translating clinical and anatomical laboratory workflows into Next.js interfaces, Fastify APIs, MariaDB models, dynamic forms, reporting, and role-based access control.",
    "Built TypeScript crypto market infrastructure with Bun, Elysia.js, Redis, and WebSockets across centralized exchanges and Solana liquidity venues.",
    "Developed market monitoring, opportunity detection, fee-aware profitability checks, trade lifecycle persistence, and asynchronous execution workflows.",
    "Contributed targeted frontend and REST API modernization to an OpenEMR fork while preserving workflows in a mature PHP and MySQL codebase.",
    "Built and maintained production infrastructure with AWS, Docker, Linux, CI/CD, Grafana, and cloud-hosted databases.",
  ]),
  freelanceExperience([
    "Delivered 100+ website designs as part of a remote web-design team after an initial Fiverr engagement became longer-term direct work.",
    "Worked with several Fiverr and direct clients; both clients who left public reviews gave 5-star ratings.",
    "Built responsive business websites and interfaces, then progressed into frontend and full-stack work with JavaScript, React, Next.js, and Node.js.",
    "Completed contract ecommerce work spanning storefronts, products, orders, dashboards, integrations, revisions, deployment, and maintenance.",
  ]),
];

export const typescriptExperience = balancedExperience;

export const frontendExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Owned approximately 85% of an enterprise LIMS over 2.5 years, building multi-role Next.js interfaces for patient, sample, clinical, anatomical, dynamic-form, and reporting workflows.",
    "Connected responsive application flows to Fastify APIs, MariaDB models, permission rules, and backend business logic.",
    "Built real-time market dashboards and data views with React, Next.js, TypeScript, WebSockets, and charting infrastructure.",
    "Modernized selected clinician and patient workflows in an OpenEMR fork while preserving behavior in a mature legacy codebase.",
  ]),
  freelanceExperience([
    "Delivered 100+ website designs as part of a remote web-design team and worked with several Fiverr and direct clients.",
    "Built responsive business websites, storefronts, dashboards, CMS interfaces, and job-platform features with JavaScript, React, and Next.js.",
    "Handled requirements, revisions, API integration, deployment, maintenance, and production troubleshooting across freelance and contract work.",
  ]),
];

export const nodeExperience: ResumeData["experience"] = [
  interspeedExperience("Full-Stack TypeScript Developer", [
    "Engineered TypeScript backend services with Bun, Elysia.js, and Fastify for healthcare workflows and real-time crypto market-intelligence R&D.",
    "Built Redis-backed WebSocket pipelines for live market data across Binance, KuCoin, Coinbase, dYdX, and Solana liquidity venues.",
    "Implemented opportunity detection, fee-aware profitability checks, configurable thresholds, trade lifecycle persistence, and asynchronous execution processing.",
    "Designed APIs, MariaDB data models, permission rules, and workflow services while owning approximately 85% of an enterprise LIMS over 2.5 years.",
    "Built production infrastructure with AWS, Docker, Linux, CI/CD, Grafana, and cloud-hosted database services.",
  ]),
  freelanceExperience([
    "Progressed from web design into frontend and full-stack development through Fiverr, direct client, and contract work.",
    "Built responsive websites, ecommerce services, CMS dashboards, and business workflows with JavaScript, React, Next.js, and Node.js.",
    "Handled client requirements, revisions, integrations, deployments, maintenance, and production troubleshooting.",
  ]),
];

export const limsProject: ResumeData["projects"][number] = {
  name: "Laboratory Information Management System (LIMS)",
  desc: "Private enterprise HealthTech platform for hospitals and diagnostic laboratories.",
  bullets: [
    "Owned and delivered approximately 85% of the system over 2.5 years using Next.js, Fastify, TypeScript, and MariaDB.",
    "Implemented patient and sample workflows, clinical and anatomical laboratory processes, role-based access, dynamic forms, reporting, and operational automation.",
  ],
  links: [],
};

export const cryptoProject: ResumeData["projects"][number] = {
  name: "Algorithmic Crypto Trading Platform",
  desc: "R&D platform for real-time market intelligence, arbitrage research, strategy validation, and automated execution architecture.",
  bullets: [
    "Built real-time market-data ingestion and Redis-backed processing across centralized exchanges and Solana liquidity venues.",
    "Implemented cross-exchange opportunity detection, fee-aware profitability calculations, slippage and liquidity checks, simulation workflows, and trade lifecycle tracking.",
  ],
  links: [],
};

export const tradingProject: ResumeData["projects"][number] = {
  name: "Multi-Exchange Solana Trading Platform",
  desc: "Automated trading system coordinating centralized and decentralized exchange integrations.",
  bullets: [
    "Built Bun, Elysia.js, Next.js, PostgreSQL, Prisma, Redis, and WebSocket workflows for market monitoring, balances, automated execution, and operational dashboards.",
    "Integrated Binance, KuCoin, Coinbase, dYdX, and Jupiter/Solana workflows with configurable thresholds and persistent trade state.",
  ],
  links: [],
};

export const jobPlatformsProject: ResumeData["projects"][number] = {
  name: "Job Posting Platforms",
  desc: "Production job-posting applications supporting public listings, administration, and business recruitment workflows.",
  bullets: [
    "Built public job discovery, listing management, administration dashboards, database-backed workflows, and production deployment flows.",
    "Delivered complete features across responsive Next.js interfaces and backend services.",
  ],
  links: [],
};

export const ecommerceProject: ResumeData["projects"][number] = {
  name: "Ecommerce Applications",
  desc: "Production commerce systems for client and business-owned retail workflows.",
  bullets: [
    "Built storefront, product, order, dashboard, payment, and third-party integration workflows used for real customer purchases.",
    "Handled responsive interfaces, business requirements, revisions, deployment, and ongoing maintenance.",
  ],
  links: [],
};

export const emrProject: ResumeData["projects"][number] = {
  name: "OpenEMR Workflow Modernization",
  desc: "Targeted modernization of clinician and patient workflows in a mature OpenEMR fork.",
  bullets: [
    "Improved selected React interfaces and REST API integrations within a large PHP and MySQL codebase.",
    "Preserved established EMR behavior while incrementally improving usability and maintainability.",
  ],
  links: [],
};

export const paybridgeProject: ResumeData["projects"][number] = {
  name: "PayBridge",
  desc: "R&D platform for institutional cross-border settlement orchestration using stablecoin infrastructure.",
  bullets: [
    "Designed settlement, treasury, liquidity, payout, reconciliation, audit, and exception-management workflows in TypeScript.",
    "Implemented a testnet settlement experience with Circle and Arc while keeping simulated fiat activity separate from blockchain activity.",
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
    basics: { name: "Abdullah Khalid", title: overrides.title, email: "khalid.code03@gmail.com", location: "Dhaka, Bangladesh (Remote)", links },
    summary: overrides.summary,
    skills: overrides.skills,
    experience: overrides.experience ?? balancedExperience,
    projects: overrides.projects,
    education,
    languages,
  };
}

export const fullStackSkills: ResumeData["skills"] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "PHP"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "SvelteKit", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Bun", "Fastify", "NestJS", "Elysia.js", "REST APIs"] },
  { group: "Data", items: ["PostgreSQL", "MariaDB", "MongoDB", "Redis", "Prisma", "WebSockets"] },
  { group: "Cloud & Delivery", items: ["AWS", "Docker", "CI/CD", "Linux", "Vercel", "Grafana"] },
];

export const typescriptSkills: ResumeData["skills"] = [
  { group: "Core", items: ["TypeScript", "JavaScript", "System Design", "Clean Architecture"] },
  { group: "Applications", items: ["React", "Next.js", "Node.js", "Bun", "Fastify", "NestJS", "Elysia.js"] },
  { group: "Data & Realtime", items: ["PostgreSQL", "MariaDB", "Redis", "Prisma", "WebSockets"] },
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
  { group: "Data", items: ["PostgreSQL", "MariaDB", "MongoDB", "Redis", "Prisma"] },
  { group: "Cloud & Operations", items: ["AWS", "Docker", "Linux", "CI/CD", "Grafana"] },
];
