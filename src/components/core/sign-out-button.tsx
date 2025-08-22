"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/auth/sign-in"),
      },
    });
  };
  return (
    <Button variant="outline" onClick={onSignOut} className={className}>Sign out</Button>
  );
}
