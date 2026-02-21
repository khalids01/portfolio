import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { setFeatureFlag } from "@/lib/features";

/** Returns whether the app has already been set up (an ADMIN user exists). */
async function adminExists(): Promise<boolean> {
  const count = await prisma.user.count({ where: { role: "ADMIN" } });
  return count > 0;
}

/**
 * GET /api/admin/setup
 * Public — returns { hasAdmin: boolean } so the UI and middleware can gate the setup page.
 */
export async function GET() {
  try {
    const hasAdmin = await adminExists();
    return NextResponse.json({ hasAdmin });
  } catch (e) {
    console.error("/api/admin/setup GET error", e);
    return NextResponse.json(
      { error: "Failed to check setup status" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/setup
 * Public (no auth needed — that's the whole point of setup).
 * Body: { email: string }
 *
 * - Blocked if an ADMIN already exists (prevents privilege escalation).
 * - Creates the user with role ADMIN (or promotes existing non-admin user).
 * - Locks signups so no one else can register.
 * - Sends a magic link to the provided email so the admin can log in immediately.
 */
export async function POST(req: Request) {
  try {
    // Guard: if setup is already done, refuse
    if (await adminExists()) {
      return NextResponse.json(
        { error: "Setup already completed. An admin account already exists." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const email = (body?.email ?? "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    // Upsert user with ADMIN role
    const existing = await prisma.user.findUnique({ where: { email } });
    let user;
    if (existing) {
      user = await prisma.user.update({
        where: { email },
        data: { role: "ADMIN", emailVerified: true },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0], // sensible default name
          emailVerified: true,
          role: "ADMIN",
        },
      });
    }

    // Lock sign-ups so no one else can create an account
    await setFeatureFlag("disableSignUp", true);

    // Send magic link so the admin can log in immediately
    await auth.api.signInMagicLink({
      body: { email: user.email!, callbackURL: "/admin" },
      headers: new Headers({
        origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4000",
      }),
    });

    return NextResponse.json({
      ok: true,
      message: "Setup complete. Check your email for the sign-in link.",
    });
  } catch (e) {
    console.error("/api/admin/setup POST error", e);
    return NextResponse.json(
      { error: "Setup failed. Please try again." },
      { status: 500 },
    );
  }
}
