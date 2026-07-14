"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { resumeSchema, type ResumeData } from "../schema";
import { revalidatePath } from "next/cache";
import { clearResumePdfCache } from "../pdf-cache";

export async function updateResume(input: {
  slug: string;
  title: string;
  targetRole?: string | null;
  isDefault?: boolean;
  defaultLayout?: string;
  data: ResumeData;
}) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    throw new Error(admin.message);
  }

  // Validate data
  const parsed = resumeSchema.safeParse(input.data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  try {
    if (input.isDefault) {
      await prisma.resume.updateMany({
        where: { slug: { not: input.slug } },
        data: { isDefault: false },
      });
    }

    await prisma.resume.upsert({
      where: { slug: input.slug },
      create: {
        slug: input.slug,
        title: input.title,
        targetRole: input.targetRole ?? null,
        isDefault: Boolean(input.isDefault),
        defaultLayout: input.defaultLayout ?? "classic",
        data: parsed.data,
      },
      update: {
        title: input.title,
        targetRole: input.targetRole ?? null,
        isDefault: Boolean(input.isDefault),
        defaultLayout: input.defaultLayout ?? "classic",
        data: parsed.data,
      },
    });

    clearResumePdfCache();
    revalidatePath("/resume");
    revalidatePath(`/resume/${input.slug}`);
    revalidatePath("/admin/resume");
    return { success: true };
  } catch (error) {
    console.error("Failed to update resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
}
