"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

type State = "idle" | "loading" | "done" | "error";

export default function SetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();

      if (!res.ok) {
        setMessage(json.error ?? "Something went wrong.");
        setState("error");
      } else {
        setMessage(json.message ?? "Setup complete! Check your email.");
        setState("done");
      }
    } catch {
      setMessage("Network error. Please try again.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt="Logo"
            className="h-16 w-16 rounded-full mx-auto object-cover shadow-lg"
          />
          <h1 className="text-2xl font-bold tracking-tight">First-time Setup</h1>
          <p className="text-sm text-muted-foreground">
            Create your admin account to get started.
          </p>
        </div>

        {state === "done" ? (
          /* ── Success state ── */
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  Setup complete!
                </p>
                <p className="text-sm text-muted-foreground mt-1">{message}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the magic link in your email to log in.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => router.push("/")}
              >
                Go to homepage
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* ── Setup form ── */
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Admin Account</CardTitle>
              </div>
              <CardDescription>
                Enter your email address. We&apos;ll send you a magic link to
                sign in — no password needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    disabled={state === "loading"}
                  />
                </div>

                {state === "error" && (
                  <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                    {message}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={state === "loading"}>
                  {state === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up…
                    </>
                  ) : (
                    "Complete Setup & Send Magic Link"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-muted-foreground">
          This page is only accessible once. After setup it will be locked.
        </p>
      </div>
    </div>
  );
}
