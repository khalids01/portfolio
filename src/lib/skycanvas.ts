import { createNextSso } from "@skycanvasstudio/sso/next";
import { env } from "@/env";

export const skycanvas = createNextSso({
  publishableKey: env.SKYCANVAS_PUBLISHABLE_KEY,
  secretKey: env.SKYCANVAS_SECRET_KEY,
  ssoUrl: env.SKYCANVAS_SSO_URL,
  interactionMode: "embedded",
  appUrl: env.NEXT_PUBLIC_APP_URL,
  oauthMode: "popup",
});
