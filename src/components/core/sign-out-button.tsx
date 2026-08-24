"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSkycanvas } from "@skycanvasstudio/sso/react";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const { logout } = useSkycanvas();
  const onSignOut = async () => {
    await logout({ returnTo: "/auth/sign-in" });
    router.push("/auth/sign-in");
  };
  return (
    <Button variant="outline" onClick={onSignOut} className={className}>Sign out</Button>
  );
}
