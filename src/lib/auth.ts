import { betterAuth } from "better-auth";
import { env } from "@/env";
import { sendEmail } from "./email";
import { magicLink } from "better-auth/plugins/magic-link";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getFeatureFlag } from "./features";

// Configure Better Auth instance
export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_APP_URL, // optional but recommended for email links
  telemetry: { enabled: false },
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        // If sign-ups are disabled, only allow existing users to request a link
        const [disabled, existing] = await Promise.all([
          getFeatureFlag("disableSignUp"),
          prisma.user.findUnique({ where: { email } }),
        ]);
        if (disabled && !existing) {
          console.warn("Magic link blocked: sign-ups disabled and user does not exist", { email });
          return; // Do not send email
        }

        console.log("Sending magic link", { to: email, url });
        await sendEmail({
          to: email,
          subject: "Sign in to your account",
          text: `Click to sign in: ${url}`,
          html: `<p>Click to sign in: <a href="${url}">${url}</a></p>`,
        });
        console.log("Magic link email enqueued");
      },
    }),
  ],
});
