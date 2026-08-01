"use client";

import { Button } from "@/components/ui/button";
import { signInWithSso } from "@/lib/auth-client";

export function SignInForm() {
  return (
    <div className="max-w-xs">
      <Button onClick={() => signInWithSso("/admin")} type="button" className="w-full">
        Continue with SkyCanvas
      </Button>
    </div>
  );
}
