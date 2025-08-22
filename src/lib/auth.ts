import { betterAuth } from "better-auth";
import { env } from "@/env";
import { sendEmail } from "./email";
import { magicLink } from "better-auth/plugins/magic-link";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Configure Better Auth instance
export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_APP_URL, // optional but recommended for email links
  telemetry: { enabled: false },
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
    // Password reset flow emails
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click to reset your password: ${url}`,
        html: `<p>Click to reset your password: <a href="${url}">${url}</a></p>`,
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password reset for ${user.email}`);
    },
  },
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        await sendEmail({
          to: email,
          subject: "Sign in to your account",
          text: `Click to sign in: ${url}`,
          html: `<p>Click to sign in: <a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
});
