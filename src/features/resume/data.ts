import "server-only";
import { prisma } from "@/lib/prisma";
import { resumeSchema, type ResumeData } from "./schema";

export async function getResume(): Promise<ResumeData> {
  const row = await prisma.resume.findUnique({
    where: { slug: "default" },
  });

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
