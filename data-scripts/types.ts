import type { PrismaClient } from "../prisma/generated/client";

export type SeedGroup =
  | "profile"
  | "skills"
  | "categories"
  | "experience"
  | "projects"
  | "resume";

export type SeedContext = {
  prisma: PrismaClient;
};

export type SeedScript = {
  id: string;
  label: string;
  group: SeedGroup;
  order: number;
  dependsOn?: string[];
  run: (ctx: SeedContext) => Promise<void>;
};

export type ProjectCaseStudy = {
  problem?: string;
  role?: string;
  architecture?: string[];
  features?: string[];
  challenges?: string[];
  result?: string;
};
