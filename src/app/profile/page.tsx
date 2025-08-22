import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignOutButton } from "@/components/core/sign-out-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLandingData } from "@/features/landing/data";
import { SiteHeader } from "@/components/core/site-header";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Profile</h1>
        <p className="mb-4">You are not signed in.</p>
        <a className="underline" href="/auth/sign-in">
          Go to Sign In
        </a>
      </div>
    );
  }

  const { user } = session;

  const data = await getLandingData();

  return (
    <>
      <SiteHeader name={data.name} session={data.session} />
      <div className="container py-10 space-y-4 mx-auto">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Signed in as {user.email ?? user.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded border p-4 max-w-md space-y-1 mb-4">
              <div className="text-sm">
                <span className="font-medium">ID:</span> {user.id}
              </div>
              {user.name && (
                <div className="text-sm">
                  <span className="font-medium">Name:</span> {user.name}
                </div>
              )}
              {user.email && (
                <div className="text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </div>
              )}
            </div>
            <SignOutButton />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
