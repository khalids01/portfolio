import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  balancedExperience,
  createResume,
  cryptoProject,
  ecommerceProject,
  emrProject,
  frontendExperience,
  frontendSkills,
  fullStackSkills,
  jobPlatformsProject,
  limsProject,
  nodeExperience,
  nodeSkills,
  paybridgeProject,
  tradingProject,
  typescriptExperience,
  typescriptSkills,
} from "./resume-data";

const baseSummary = "Engineer with 6+ years of experience delivering production web systems and complex product workflows for remote teams and clients.";

function resumeSeed({
  slug,
  label,
  title,
  summary,
  skills,
  experience = balancedExperience,
  projects,
  order,
  isDefault = false,
}: {
  slug: string;
  label: string;
  title: string;
  summary: string;
  skills: typeof fullStackSkills;
  experience?: typeof balancedExperience;
  projects: Parameters<typeof createResume>[0]["projects"];
  order: number;
  isDefault?: boolean;
}): SeedScript {
  return {
    id: `resume/${slug}`,
    label: `Resume: ${label}`,
    group: "resume",
    order,
    dependsOn: ["profile/default"],
    async run({ prisma }) {
      await upsertResume(prisma, {
        slug,
        title: `${title} Resume`,
        targetRole: title,
        isDefault,
        defaultLayout: "ats-standard",
        data: createResume({ title, summary, skills, experience, projects }),
      });
    },
  };
}

export const resumeSeeds: SeedScript[] = [
  resumeSeed({
    slug: "default", label: "Full-Stack TypeScript Engineer", title: "Full-Stack TypeScript Engineer", order: 50, isDefault: true,
    summary: `${baseSummary} Strong across TypeScript, React, Next.js, Node.js, Bun, relational data, real-time systems, cloud delivery, and domain-heavy HealthTech, FinTech, SaaS, and ecommerce applications.`,
    skills: typescriptSkills, projects: [limsProject, cryptoProject, tradingProject],
  }),
  resumeSeed({
    slug: "senior-javascript-engineer", label: "Senior JavaScript Engineer", title: "Senior JavaScript Engineer", order: 51,
    summary: `${baseSummary} Owns complex React and Next.js products end to end, with backend and real-time systems experience in Node.js, Bun, APIs, databases, and production delivery.`,
    skills: fullStackSkills, projects: [limsProject, tradingProject, jobPlatformsProject],
  }),
  resumeSeed({
    slug: "javascript-developer", label: "JavaScript Developer", title: "JavaScript Developer", order: 52,
    summary: `${baseSummary} Progressed from responsive web design into frontend and full-stack development, building business interfaces, dashboards, ecommerce workflows, APIs, and production applications.`,
    skills: fullStackSkills, projects: [jobPlatformsProject, ecommerceProject, limsProject],
  }),
  resumeSeed({
    slug: "typescript-developer", label: "TypeScript Developer", title: "TypeScript Developer", order: 53,
    summary: `${baseSummary} Builds typed application boundaries across React, Next.js, backend services, data models, real-time processing, and operational tooling.`,
    skills: typescriptSkills, experience: typescriptExperience, projects: [limsProject, cryptoProject, jobPlatformsProject],
  }),
  resumeSeed({
    slug: "nodejs-developer", label: "Node.js Developer", title: "Node.js Developer", order: 54,
    summary: `${baseSummary} Backend-focused developer experienced with Node.js, Bun, Fastify, Elysia.js, APIs, Redis, WebSockets, relational databases, integrations, AWS, and Docker.`,
    skills: nodeSkills, experience: nodeExperience, projects: [cryptoProject, tradingProject, limsProject],
  }),
  resumeSeed({
    slug: "senior-full-stack-typescript-engineer", label: "Senior Full-Stack TypeScript Engineer", title: "Senior Full-Stack TypeScript Engineer", order: 55,
    summary: `${baseSummary} Has primary ownership of an enterprise LIMS and hands-on responsibility across product architecture, APIs, data modeling, real-time trading infrastructure, deployment, and technical delivery.`,
    skills: typescriptSkills, projects: [limsProject, tradingProject, paybridgeProject],
  }),
  resumeSeed({
    slug: "senior-frontend-engineer-react-nextjs", label: "Senior Frontend Engineer / React & Next.js", title: "Senior Frontend Engineer / React & Next.js", order: 56,
    summary: `${baseSummary} Frontend-leaning engineer specializing in React and Next.js interfaces for clinical workflows, dashboards, dynamic forms, reporting, role-aware applications, and real-time data views.`,
    skills: frontendSkills, experience: frontendExperience, projects: [limsProject, jobPlatformsProject, emrProject],
  }),
  resumeSeed({
    slug: "backend-typescript-engineer", label: "Backend TypeScript Engineer", title: "Backend TypeScript Engineer", order: 57,
    summary: `${baseSummary} Designs typed APIs, data models, event-driven processing, and execution-aware services with Bun, Elysia.js, Fastify, Redis, WebSockets, PostgreSQL, and MariaDB.`,
    skills: nodeSkills, experience: nodeExperience, projects: [cryptoProject, tradingProject, paybridgeProject],
  }),
  resumeSeed({
    slug: "full-stack-javascript-engineer", label: "Full-Stack JavaScript Engineer", title: "Full-Stack JavaScript Engineer", order: 58,
    summary: `${baseSummary} Delivers complete JavaScript web products across responsive UI, APIs, databases, integrations, ecommerce, job platforms, deployment, and production support.`,
    skills: fullStackSkills, projects: [jobPlatformsProject, ecommerceProject, limsProject],
  }),
  resumeSeed({
    slug: "software-engineer", label: "Software Engineer", title: "Software Engineer", order: 59,
    summary: `${baseSummary} Works comfortably across product interfaces, backend services, data modeling, real-time systems, infrastructure, and domain-heavy applications where correctness and maintainability matter.`,
    skills: typescriptSkills, projects: [limsProject, cryptoProject, paybridgeProject],
  }),
];
