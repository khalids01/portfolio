import { authClient, useSso } from "@/lib/auth-client"

// Exact Better Auth types, including fields added by your config/plugins.
export type AuthSession = typeof authClient.$Infer.Session
export type AuthUser = AuthSession["user"]
export type SsoReactValue = ReturnType<typeof useSso>

// Example component props:
export type AccountMenuProps = {
    user: AuthUser
}

// SkyCanvas-owned types are available separately when needed:
export type {
    SsoUser,
    SsoSession,
    SsoClientMetadata,
    VerifiedSsoIdentity,
} from "@skycanvasstudio/sso/types"