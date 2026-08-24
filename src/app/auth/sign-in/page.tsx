"use client";

import "@skycanvasstudio/sso/styles.css";
import { SignIn } from "@skycanvasstudio/sso/react";

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm">
      <SignIn
        returnTo="/admin"
        onSuccess={() => window.location.assign("/admin")}
      />
    </div>
  );
}
