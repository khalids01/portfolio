"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { signInWithSso } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SsoLoginButton({
  callbackURL = "/",
  label = "Login",
  className,
}: {
  callbackURL?: string;
  label?: string;
  className?: string;
}) {
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const handleSignIn = async () => {
    setIsRedirecting(true);

    try {
      const result = await signInWithSso(callbackURL);
      if (result.error) setIsRedirecting(false);
    } catch {
      setIsRedirecting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleSignIn}
      disabled={isRedirecting}
      variant="ghost"
      size="sm"
      className={className}
    >
      {isRedirecting && <LoaderCircle className="animate-spin" />}
      {isRedirecting ? "Redirecting…" : label}
    </Button>
  );
}
