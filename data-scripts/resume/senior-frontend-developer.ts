import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  createResume,
  emrProject,
  frontendExperience,
  frontendSkills,
  jobPlatformsProject,
  limsProject,
} from "./resume-data";

export const seniorFrontendDeveloperResumeSeed: SeedScript = {
  id: "resume/senior-frontend-developer",
  label: "Resume: Senior Frontend Developer",
  group: "resume",
  order: 53,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "senior-frontend-developer",
      title: "Senior Frontend Developer Resume",
      targetRole: "Senior Frontend Developer",
      defaultLayout: "ats-plain",
      data: createResume({
        title: "Senior Frontend Developer",
        summary:
          "Frontend-focused TypeScript developer with 6+ years of experience building React and Next.js applications for complex business workflows. Experienced in responsive dashboards, dynamic forms, role-aware interfaces, real-time data views, API integration, performance-focused implementation, and delivering production features with backend and product stakeholders.",
        skills: frontendSkills,
        experience: frontendExperience,
        projects: [limsProject, jobPlatformsProject, emrProject],
      }),
    });
  },
};
