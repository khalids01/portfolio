"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { resumeSchema, type ResumeData } from "../schema";
import { revalidatePath } from "next/cache";
import { clearResumePdfCache } from "../pdf-cache";

export async function updateResume(data: ResumeData) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    throw new Error(admin.message);
  }

  // Validate data
  const parsed = resumeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  try {
    await prisma.resume.upsert({
      where: { slug: "default" },
      create: {
        slug: "default",
        data: parsed.data,
      },
      update: {
        data: parsed.data,
      },
    });

    clearResumePdfCache();
    revalidatePath("/resume");
    revalidatePath("/admin/resume");
    return { success: true };
  } catch (error) {
    console.error("Failed to update resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
}
