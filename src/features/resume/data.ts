import "server-only";
import { prisma } from "@/lib/prisma";
import { resumeSchema, type ResumeData } from "./schema";

export type ResumeMeta = {
  id: string;
  slug: string;
  title: string;
  targetRole?: string | null;
  isDefault: boolean;
  defaultLayout: string;
};

export async function getResume(slug?: string): Promise<ResumeData> {
  const row = slug
    ? await prisma.resume.findUnique({ where: { slug } })
    : await prisma.resume.findFirst({
        where: { isDefault: true },
        orderBy: { updatedAt: "desc" },
      }) ?? await prisma.resume.findUnique({ where: { slug: "default" } });

  if (!row) {
    throw new Error("Resume not found in database. Please run the seed script.");
  }

  try {
    return resumeSchema.parse(row.data);
  } catch (error) {
    console.error("Failed to parse resume data from DB:", error);
    throw new Error("Invalid resume data structure.");
  }
}

export async function getResumeRecord(slug?: string) {
  const row = slug
    ? await prisma.resume.findUnique({ where: { slug } })
    : await prisma.resume.findFirst({
        where: { isDefault: true },
        orderBy: { updatedAt: "desc" },
      }) ?? await prisma.resume.findUnique({ where: { slug: "default" } });

  if (!row) {
    throw new Error("Resume not found in database. Please run the seed script.");
  }

  try {
    return {
      ...row,
      data: resumeSchema.parse(row.data),
    };
  } catch (error) {
    console.error("Failed to parse resume data from DB:", error);
    throw new Error("Invalid resume data structure.");
  }
}

export async function listResumeMeta(): Promise<ResumeMeta[]> {
  return prisma.resume.findMany({
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      targetRole: true,
      isDefault: true,
      defaultLayout: true,
    },
  });
}
