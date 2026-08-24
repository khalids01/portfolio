"use client";

import { SsoSignInButton } from "@skycanvasstudio/sso/react";

export function SignInForm() {
  return (
    <div className="max-w-xs">
      <SsoSignInButton
        callbackURL="/admin"
        className="w-full"
      />
    </div>
  );
}
