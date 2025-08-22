"use client";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const err = params.get("error");
  const [newPassword, setNewPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(err);
  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing token");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await authClient.resetPassword({ newPassword, token });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Failed to reset password");
      return;
    }
    setMessage("Password updated. Redirecting to sign-in...");
    setTimeout(() => router.push("/auth/sign-in"), 1200);
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Reset password</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-xs">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-700">{message}</p>}
        <Button type="submit" disabled={loading || !token} className="w-full">{loading ? "Updating..." : "Update password"}</Button>
      </form>
    </div>
  );
}
