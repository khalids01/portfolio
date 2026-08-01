# Portfolio

Personal portfolio and admin dashboard built with Next.js, React, Prisma, Better Auth, and SkyCanvas SSO.

## Requirements

- Node.js 20 or newer
- Bun
- PostgreSQL
- A SkyCanvas SSO application and client ID

## Local setup

```bash
bun install
cp .env.example .env
bunx prisma migrate dev
bun run dev
```

The application runs at [http://localhost:4000](http://localhost:4000).

## Environment variables

Start from `.env.example`. Authentication requires:

```env
NEXT_PUBLIC_APP_URL=http://localhost:4000
BETTER_AUTH_URL=http://localhost:4000
BETTER_AUTH_SECRET=replace_with_at_least_32_random_characters
SSO_CLIENT_ID=your_skycanvas_client_id
SSO_URL=https://api-sso.skycanvasstudio.com
```

`SSO_URL` points to the SkyCanvas SSO service. Keep the production value shown above unless using a real staging or self-hosted service.

The application also requires `DATABASE_URL`. File-server and SMTP variables are documented in `.env.example`; SMTP and Chromium configuration are optional.

## SkyCanvas SSO

This portfolio uses [`@skycanvasstudio/sso`](https://www.npmjs.com/package/@skycanvasstudio/sso) with Better Auth:

```ts
import { createSsoBetterAuthProvider } from "@skycanvasstudio/sso/better-auth";

const skycanvas = createSsoBetterAuthProvider({
  clientId: env.SSO_CLIENT_ID,
  baseUrl: env.SSO_URL,
});
```

Better Auth owns the OAuth callback, account, cookie, and local session. No `SSO_CALLBACK_URL` environment variable is needed.

Register this exact callback in the SkyCanvas dashboard:

```text
http://localhost:4000/api/auth/oauth2/callback/skycanvas
https://your-domain.example/api/auth/oauth2/callback/skycanvas
```

Production must use the public origin for both `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL`.

## Commands

```bash
bun run dev        # Development server on port 4000
bun run typecheck  # TypeScript validation
bun run lint       # ESLint
bun run build      # Production build
bun run start      # Start the standalone production build
```
