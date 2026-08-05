"use client"

import { createAuthClient } from "better-auth/react"
import { genericOAuthClient } from "better-auth/client/plugins"
import { createSsoBetterAuthReact } from "@skycanvasstudio/sso/react"

export const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
})

export const { SsoProvider, useSso, useSsoSession } =
  createSsoBetterAuthReact(authClient)