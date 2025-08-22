import nodemailer from "nodemailer";
import { env } from "@/env";

export type SendEmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
};

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT ?? 465,
  secure: true,
  auth: env.EMAIL && env.EMAIL_PASSWORD ? {
    user: env.EMAIL,
    pass: env.EMAIL_PASSWORD,
  } : undefined,
});

export async function sendEmail({ to, subject, text, html, from }: SendEmailParams) {
  const fromHeader = from ?? env.EMAIL_FROM ?? "Portfolio";
  await transporter.sendMail({
    from: fromHeader,
    to,
    subject,
    text,
    html,
  });
}
