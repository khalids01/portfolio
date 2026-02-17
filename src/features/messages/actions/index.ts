"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete message" };
  }
}

export async function toggleReadStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { read: !currentStatus },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update status" };
  }
}
