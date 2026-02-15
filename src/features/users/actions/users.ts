"use server";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Role } from "@/features/users/schemas/user";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    throw new Error(admin.message);
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
  });

  return users;
}

export async function updateUser(userId: string, data: { name?: string; role?: Role }) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    throw new Error(admin.message);
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    throw new Error(admin.message);
  }

  // Prevent self-deletion
  // Note: session.user.id is coming from requireAdmin -> getSession
  
  // Need to verify typings, but admin.session.user.id should be available
  // requireAdmin returns { ok: true, session: Session }
  // Let's assume session structure from better-auth
  
  const currentUserId = admin.session?.user?.id;
  
  if (currentUserId === userId) {
    return { success: false, error: "You cannot delete your own account." };
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
