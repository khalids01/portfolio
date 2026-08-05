
import { env } from "@/env";
import { createSsoBetterAuthIntegration } from "@skycanvasstudio/sso/better-auth"
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const skycanvas = createSsoBetterAuthIntegration({
  clientId: env.SSO_CLIENT_ID,
  baseUrl: env.SSO_URL,
  // forceLogin: true, // optional explicit reauthentication
})

export const auth = betterAuth({
  // Keep your existing database and auth options.
  account: { encryptOAuthTokens: true },
  plugins: [
    // Keep your existing plugins here.
    genericOAuth({ config: [skycanvas.provider] }),
  ],
})