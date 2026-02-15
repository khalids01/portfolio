import nodemailer from "nodemailer";
import { env } from "@/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT ?? 587,
  secure: (env.SMTP_PORT ?? 587) === 465,
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  },
  logger: env.NODE_ENV !== "production",
  debug: env.NODE_ENV !== "production",
});

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailParams) => {
  const fromAddress = from ?? `"${env.EMAIL_FROM}" <${env.EMAIL}>`;

  if (!env.SMTP_HOST) {
    console.warn("SMTP_HOST is not set. Magic link will not be sent.");
    return;
  }

  return transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
    text,
  });
};
