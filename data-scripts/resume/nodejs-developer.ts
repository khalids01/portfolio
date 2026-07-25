import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  createResume,
  cryptoProject,
  ecommerceProject,
  limsProject,
  nodeExperience,
  nodeSkills,
} from "./resume-data";

export const nodejsDeveloperResumeSeed: SeedScript = {
  id: "resume/nodejs-developer",
  label: "Resume: Node.js Developer",
  group: "resume",
  order: 54,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "nodejs-developer",
      title: "Node.js Developer Resume",
      targetRole: "Node.js Developer",
      defaultLayout: "ats-plain",
      data: createResume({
        title: "Node.js Developer",
        summary:
          "Backend-focused Node.js and TypeScript developer with 6+ years of experience building APIs, database-backed services, real-time data pipelines, and production web systems. Strong in Fastify, NestJS, Elysia.js, PostgreSQL, MariaDB, Redis, WebSockets, third-party integrations, AWS, and Docker across HealthTech, ecommerce, SaaS, and FinTech R&D.",
        skills: nodeSkills,
        experience: nodeExperience,
        projects: [cryptoProject, limsProject, ecommerceProject],
      }),
    });
  },
};
