import "server-only"
import { getNextBetterAuthSsoBootstrap } from "@skycanvasstudio/sso/next"
import { auth, skycanvas } from "@/lib/auth"

export async function getInitialAuthSession() {
  return getNextBetterAuthSsoBootstrap({ auth, skycanvas })
}