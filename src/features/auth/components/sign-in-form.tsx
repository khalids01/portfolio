"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onMagicLink = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.magicLink({ email, callbackURL: "/admin" });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Failed to send magic link");
      return;
    }
    alert("Magic link sent. Check your email.");
  };

  return (
    <div className="space-y-4 max-w-xs">
      <form onSubmit={onMagicLink} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button disabled={loading || !email} type="submit" className="w-full">
          {loading ? "Sending..." : "Send magic link"}
        </Button>
      </form>
    </div>
  );
}
