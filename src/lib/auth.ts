import { betterAuth } from "better-auth";

// Configure Better Auth instance
// You can extend this later with providers/plugins as needed
export const auth = betterAuth({
  // keep defaults for now; we will mount handler at /api/auth/[...all]
});
