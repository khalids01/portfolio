import { z } from "zod";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.nativeEnum(Role),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
