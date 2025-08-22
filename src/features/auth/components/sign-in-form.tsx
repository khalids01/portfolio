"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Failed to sign in");
      return;
    }
    router.push("/admin");
  };

  const onMagicLink = async () => {
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.magicLink({ email });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Failed to send magic link");
      return;
    }
    alert("Magic link sent. Check your email.");
  };

  return (
    <div className="space-y-4 max-w-xs">
      <form onSubmit={onSubmit} className="space-y-4">
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
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="w-full" onClick={onMagicLink} disabled={!email || loading}>
          Send magic link
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        <a className="underline" href="/auth/forgot-password">Forgot password?</a>
        <span className="mx-2">·</span>
        <a className="underline" href="/auth/sign-up">Create account</a>
      </div>
    </div>
  );
}
