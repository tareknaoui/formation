import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// H-2: In-memory rate limiter
// NOTE: This works for single-instance deployments.
// For multi-instance / serverless, replace with @upstash/ratelimit + Redis.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Rate-limited public routes (no auth required on these paths)
// ---------------------------------------------------------------------------
const RATE_LIMITED_PATHS = [
  "/api/auth/callback/credentials",
  "/api/auth/signin",
  "/api/register",
];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Apply rate limiting to sensitive unauthenticated endpoints
  if (RATE_LIMITED_PATHS.some((p) => path.startsWith(p))) {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return new NextResponse("Trop de requêtes. Réessayez dans une minute.", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
    return NextResponse.next();
  }

  // All other protected routes go through withAuth below
  return NextResponse.next();
}

// withAuth handles JWT-protected routes
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect admin routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect lesson pages (requires subscription or admin role)
    if (path.includes("/lessons") && !token?.isSubscribed && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/subscribe", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow middleware function to run only if the user is authenticated (token exists)
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Rate-limited public endpoints
    "/api/auth/callback/credentials",
    "/api/auth/signin",
    "/api/register",
    // Auth-protected routes
    "/admin/:path*",
    "/courses/:courseId/lessons/:lessonId*",
    "/profile/:path*",
  ],
};

