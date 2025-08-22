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
  // Default to 587 (STARTTLS) if not provided
  port: env.SMTP_PORT ?? 587,
  // Use TLS only for 465, otherwise STARTTLS on 587/25
  secure: (env.SMTP_PORT ?? 587) === 465,
  auth: env.EMAIL && env.EMAIL_PASSWORD
    ? { user: env.EMAIL, pass: env.EMAIL_PASSWORD }
    : undefined,
  logger: env.NODE_ENV !== "production",
  debug: env.NODE_ENV !== "production",
});

export async function sendEmail({ to, subject, text, html, from }: SendEmailParams) {
  // Compose a valid From header. If EMAIL_FROM is just a name, pair it with EMAIL.
  let fromHeader = from ?? env.EMAIL_FROM;
  if (!fromHeader || !fromHeader.includes("@")) {
    if (env.EMAIL) {
      const display = fromHeader && !fromHeader.includes("<") ? `${fromHeader} <${env.EMAIL}>` : env.EMAIL;
      fromHeader = display;
    } else {
      fromHeader = "no-reply@localhost";
    }
  }

  if (!env.SMTP_HOST) {
    console.error("SMTP_HOST is not set. Unable to send email.");
    throw new Error("SMTP is not configured (missing SMTP_HOST)");
  }
  if (!transporter.options || !("auth" in transporter.options) || !transporter.options.auth) {
    console.warn("SMTP auth credentials are missing. Attempting to send without authentication.");
  }

  try {
    await transporter.sendMail({
      from: fromHeader,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Failed to send email via SMTP:", {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: (env.SMTP_PORT ?? 587) === 465,
      from: fromHeader,
      to,
      error: err,
    });
    throw err;
  }
}
