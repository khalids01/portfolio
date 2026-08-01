"use client";

import { signInWithSso } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function SsoLoginButton() {
  return (
    <Button type="button" onClick={()=>signInWithSso()} variant="ghost" size="sm">
      Login
    </Button>
  );
}
