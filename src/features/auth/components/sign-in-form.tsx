"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO hook up real auth
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xs">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">Sign in</Button>
    </form>
  );
}
