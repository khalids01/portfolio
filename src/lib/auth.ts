import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";
import { createFreeSsoBetterAuthProvider } from "@skycanvasstudio/sso/server";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const skycanvas = createFreeSsoBetterAuthProvider({
  clientId: env.SSO_CLIENT_ID,
  baseUrl: env.SSO_URL,
});

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
