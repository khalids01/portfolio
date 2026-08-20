import { z } from "zod";

const normalizeEnvString = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  // Allow accidental wrapping quotes from env dashboards/copy-paste.
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    const unquoted = trimmed.slice(1, -1).trim();
    return unquoted || undefined;
  }

  return trimmed;
};

const envSchema = z
  .object({
    DATABASE_URL: z.preprocess(normalizeEnvString, z.string().min(1)),
    EMAIL: z.preprocess(normalizeEnvString, z.string().optional()),
    EMAIL_PASSWORD: z.preprocess(normalizeEnvString, z.string().optional()),
    EMAIL_FROM: z.string().default("Portfolio"),
    SMTP_HOST: z.preprocess(normalizeEnvString, z.string().optional()),
    SMTP_PORT: z
      .preprocess(normalizeEnvString, z.string().optional())
      .optional()
      .transform((v) => (v ? Number(v) : undefined))
      .pipe(z.number().optional()),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BETTER_AUTH_URL: z.preprocess(
      normalizeEnvString,
      z.string().url().optional(),
    ),
    BETTER_AUTH_SECRET: z.preprocess(normalizeEnvString, z.string().min(32)),
    SKYCANVAS_PUBLISHABLE_KEY: z.preprocess(
      normalizeEnvString,
      z.string().min(1),
    ),
    SKYCANVAS_SSO_URL: z.preprocess(normalizeEnvString, z.string().url()),
    SKYCANVAS_SECRET_KEY: z.preprocess(normalizeEnvString, z.string()),
    NEXT_PUBLIC_APP_URL: z.preprocess(
      normalizeEnvString,
      z.string().optional(),
    ),
    CHROMIUM_EXECUTABLE_PATH: z.preprocess(
      normalizeEnvString,
      z.string().optional(),
    ),
    FILE_SERVER_URL: z.preprocess(normalizeEnvString, z.string().optional()),
    FILE_SERVER_PUBLIC_URL: z.preprocess(
      normalizeEnvString,
      z.string().optional(),
    ),
    FILE_SERVER_API_KEY: z.preprocess(
      normalizeEnvString,
      z.string().optional(),
    ),
    APP_URL: z.preprocess(normalizeEnvString, z.string()),
    SSO_WEBHOOK_SECRET: z.preprocess(normalizeEnvString, z.string().min(16)),
  })
  .superRefine((env, ctx) => {
    // If SMTP is enabled, credentials must exist.
    if (env.SMTP_HOST && !env.EMAIL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "EMAIL is required when SMTP_HOST is set",
        path: ["EMAIL"],
      });
    }

    if (env.SMTP_HOST && !env.EMAIL_PASSWORD) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "EMAIL_PASSWORD is required when SMTP_HOST is set",
        path: ["EMAIL_PASSWORD"],
      });
    }
  });

const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  SKYCANVAS_PUBLISHABLE_KEY: process.env.SKYCANVAS_PUBLISHABLE_KEY,
  SKYCANVAS_SSO_URL: process.env.SKYCANVAS_SSO_URL,
  SKYCANVAS_SECRET_KEY: process.env.SKYCANVAS_SECRET_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  CHROMIUM_EXECUTABLE_PATH: process.env.CHROMIUM_EXECUTABLE_PATH,
  FILE_SERVER_URL: process.env.FILE_SERVER_URL,
  FILE_SERVER_PUBLIC_URL: process.env.FILE_SERVER_PUBLIC_URL,
  FILE_SERVER_API_KEY: process.env.FILE_SERVER_API_KEY,
  APP_URL: process.env.APP_URL,
  SSO_WEBHOOK_SECRET: process.env.SSO_WEBHOOK_SECRET,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
