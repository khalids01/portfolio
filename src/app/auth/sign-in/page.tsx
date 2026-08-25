"use client";

import "@skycanvasstudio/sso/styles.css";
import { SignIn, useAuth } from "@skycanvasstudio/sso/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) router.push("/");
  }, [isSignedIn]);
  return (
    <div className="w-full max-w-sm">
      <SignIn
        returnTo="/admin"
        onSuccess={() => window.location.assign("/admin")}
      />
    </div>
  );
}
