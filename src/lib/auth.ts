import { betterAuth } from "better-auth";
import { env } from "@/env";
import { sendEmail } from "@/features/email/nodemailer";
import { magicLinkTemplate } from "@/features/email/templates/magic-link";
import { magicLink } from "better-auth/plugins/magic-link";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getFeatureFlag } from "./features";

// Configure Better Auth instance
export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_APP_URL, // optional but recommended for email links
  telemetry: { enabled: false },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  },
  // user:{
  //   additionalFields: {
  //     role: {
  //       type: "string",
  //       default: "user",
  //     },
  //   }
  // },
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        // If sign-ups are disabled, only allow existing users to request a link
        const [disabled, existing] = await Promise.all([
          getFeatureFlag("disableSignUp"),
          prisma.user.findUnique({ where: { email } }),
        ]);
        if (disabled && !existing) {
          console.warn(
            "Magic link blocked: sign-ups disabled and user does not exist",
            { email },
          );
          return; // Do not send email
        }

        console.log("Sending magic link", { to: email, url });
        await sendEmail({
          to: email,
          subject: "Sign in to your portfolio",
          html: magicLinkTemplate(url),
          text: `Click the link to sign in to your dashboard: ${url}`,
        });
        console.log("Magic link email sent");
      },
    }),
  ],
});
