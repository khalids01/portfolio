"use client";

import { SsoLoginButton } from "@/components/core/SSO-login-btn";

export function SignInForm() {
  return (
    <div className="max-w-xs">
      <SsoLoginButton
        callbackURL="/admin"
        label="Continue with SkyCanvas"
        className="w-full"
      />
    </div>
  );
}
