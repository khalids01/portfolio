"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

type Props = {
  name?: string;
  image?: string;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
};

export function UserMenu({
  name,
  image: initialImage,
  isAuthenticated = true,
  isAdmin = false,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const displayName = session?.user.name || name;
  const image = session?.user.image || initialImage;
  const initial = (displayName?.[0] || "U").toUpperCase();

  const onSignOut = async () => {
    setIsSigningOut(true);
    const result = await authClient.signOut();

    if (result.error) {
      setIsSigningOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10 rounded-full">
          <Avatar className="size-8">
            {image && (
              <AvatarImage
                src={image}
                alt={displayName || "User avatar"}
                referrerPolicy="no-referrer"
              />
            )}
            <AvatarFallback className="text-xs">{initial}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>{displayName || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuthenticated && (
          <>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin" className="flex items-center">
                  <LayoutDashboard className="mr-2 size-4" /> Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 size-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 size-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onSignOut}
              disabled={isSigningOut}
              className="text-destructive"
            >
              {isSigningOut ? (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 size-4" />
              )}
              {isSigningOut ? "Logging out…" : "Log out"}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
