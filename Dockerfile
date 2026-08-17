# =========================
# 1) BUILDER
# =========================
FROM node:24-bookworm-slim AS builder

WORKDIR /app

# ---- System deps for Prisma ----
RUN apt-get update && apt-get install -y \
  openssl \
  libssl3 \
  libc6 \
  libgcc-s1 \
  libstdc++6 \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ---- Install deps ----
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install --legacy-peer-deps

# ---- App source ----
COPY . .

# ---- Build-time environment variables ----
ARG DATABASE_URL
ARG EMAIL
ARG EMAIL_PASSWORD
ARG EMAIL_FROM
ARG SMTP_HOST
ARG SMTP_PORT
ARG NEXT_PUBLIC_APP_URL
ARG FILE_SERVER_URL
ARG FILE_SERVER_API_KEY
ARG BETTER_AUTH_URL
ARG BETTER_AUTH_SECRET
ENV SKYCANVAS_PUBLISHABLE_KEY
ENV SKYCANVAS_SECRET_KEY
ENV SKYCANVAS_SSO_URL

ENV DATABASE_URL=$DATABASE_URL
ENV EMAIL=$EMAIL
ENV EMAIL_PASSWORD=$EMAIL_PASSWORD
ENV EMAIL_FROM=$EMAIL_FROM
ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV FILE_SERVER_URL=$FILE_SERVER_URL
ENV FILE_SERVER_API_KEY=$FILE_SERVER_API_KEY
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV SKYCANVAS_PUBLISHABLE_KEY=$SKYCANVAS_PUBLISHABLE_KEY
ENV SKYCANVAS_SECRET_KEY=$SKYCANVAS_SECRET_KEY
ENV SKYCANVAS_SSO_URL=$SKYCANVAS_SSO_URL
# ---- Prisma (NO DB needed) ----
RUN npx prisma generate

# ---- Next build (standalone output) ----
RUN npm run build


# =========================
# 2) RUNTIME (SLIM)
# =========================
FROM node:24-bookworm-slim

WORKDIR /app

# ---- Runtime system deps ----
RUN apt-get update && apt-get install -y --no-install-recommends \
  openssl \
  libssl3 \
  ca-certificates \
  chromium \
  fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

# ---- Non-root user ----
RUN useradd -ms /bin/bash -u 10001 appuser

# ---- Copy ONLY what is needed ----
COPY --from=builder --chown=appuser:appuser /app/.next/standalone ./
COPY --from=builder --chown=appuser:appuser /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appuser /app/public ./public
COPY --from=builder --chown=appuser:appuser /app/prisma ./prisma

# ---- Uploads ----
ENV UPLOAD_DIR=/uploads
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"
ENV NODE_OPTIONS=--no-network-family-autoselection
ENV CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium

RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 4000

# ---- Runtime: DB exists here ----
CMD ["node", "server.js"]
