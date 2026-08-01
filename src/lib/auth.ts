import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";
import { createSsoBetterAuthProvider } from "@skycanvasstudio/sso/better-auth";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const skycanvas = {
  ...createSsoBetterAuthProvider({
    clientId: env.SSO_CLIENT_ID,
    baseUrl: env.SSO_URL,
  }),
  // Better Auth otherwise preserves stale fields from an earlier auth method.
  overrideUserInfo: true,
};


export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL ?? env.NEXT_PUBLIC_APP_URL,
  account: { encryptOAuthTokens: true },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    genericOAuth({
      config: [skycanvas],
    }),
  ],
});
