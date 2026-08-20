import { createWebhookHandler } from "@skycanvasstudio/sso/server";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

export const POST = createWebhookHandler(
  {
    "user.created": async ({ data }) => {
        
      await prisma.user.upsert({
        where: { ssoUserId: data.id },
        create: {
          ssoUserId: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          emailVerified: data.emailVerified,
        },
        update: { name: data.name, email: data.email, image: data.image },
      });
    },
    "user.updated": async ({ data }) => {
      await prisma.user.upsert({
        where: { ssoUserId: data.id },
        create: {
          ssoUserId: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          emailVerified: data.emailVerified,
        },
        update: { name: data.name, email: data.email, image: data.image },
      });
    },
    "user.deleted": async ({ data }) => {
      await prisma.user.deleteMany({ where: { ssoUserId: data.id } });
    },
  },
  { secret: env.SSO_WEBHOOK_SECRET },
);
