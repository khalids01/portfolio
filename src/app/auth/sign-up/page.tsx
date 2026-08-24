"use client";
import * as React from "react";
import { SignUp } from "@skycanvasstudio/sso/react";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">
        Create account
      </h1>
      <SignUp oauthMode="popup" returnTo="/admin" />
    </div>
  );
}
