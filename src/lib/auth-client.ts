import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export const signInWithSso = (callbackURL = "/") =>
  authClient.signIn.oauth2({
    providerId: "skycanvas",
    callbackURL,
  });

export const { useSession, signOut, getSession } = authClient;
