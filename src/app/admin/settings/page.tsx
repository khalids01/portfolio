"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAdminFeatures } from "@/features/admin/settings/use-admin-features";

export default function AdminSettingsPage() {
  const { list, update } = useAdminFeatures();

  const flags = list.data?.data ?? [];
  const disableSignUp = useMemo(() => flags.find((f) => f.key === "disableSignUp")?.value ?? false, [flags]);

  const toggleDisableSignUp = (checked: boolean) => {
    update.mutate({ key: "disableSignUp", value: checked });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage application feature flags and access controls.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Sign up control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="disableSignUp">Disable new sign-ups</Label>
              <p className="text-sm text-muted-foreground mt-1 max-w-prose">
                When enabled, magic links are only sent to existing users. New visitors cannot sign up.
              </p>
            </div>
            <Switch
              id="disableSignUp"
              checked={disableSignUp}
              onCheckedChange={toggleDisableSignUp}
              disabled={list.isLoading || update.isPending}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
