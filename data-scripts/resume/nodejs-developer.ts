import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import { createResume, nodeSkills } from "./resume-data";

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
      data: createResume({
        title: "Node.js Developer",
        summary:
          "Backend-focused Node.js and TypeScript developer experienced in APIs, databases, WebSockets, Redis-backed data flows, fintech market ingestion, healthcare platforms, and production deployments.",
        skills: nodeSkills,
      }),
    });
  },
};
