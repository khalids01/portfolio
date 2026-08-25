"use client";
import * as React from "react";
import { SignUp, useAuth } from "@skycanvasstudio/sso/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (isSignedIn) router.push("/");
  }, [isSignedIn]);
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">
        Create account
      </h1>
      <SignUp oauthMode="popup" returnTo="/admin" />
    </div>
  );
}
