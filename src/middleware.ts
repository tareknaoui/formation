import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

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
    "/admin/:path*",
    "/courses/:courseId/lessons/:lessonId*",
    "/profile/:path*",
  ],
};
