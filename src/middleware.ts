import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the setup page and its API endpoint through without any auth checks.
  // The setup layout + API route do their own server-side guards.
  if (pathname === "/admin/setup" || pathname.startsWith("/api/admin/setup")) {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // Check if setup has been completed.
      // If no admin exists yet, send the user to the setup wizard.
      // We call our own setup check API endpoint for this.
      try {
        const checkUrl = new URL("/api/admin/setup", request.url);
        const checkRes = await fetch(checkUrl.toString(), {
          headers: { cookie: request.headers.get("cookie") ?? "" },
        });
        if (checkRes.ok) {
          const { hasAdmin } = await checkRes.json();
          if (!hasAdmin) {
            return NextResponse.redirect(new URL("/admin/setup", request.url));
          }
        }
      } catch {
        // If the check fails (e.g., DB not ready), fall through to home redirect
      }

      // Setup is done but user is not logged in → redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/setup"],
};
