import { NextResponse } from "next/server";

// NOTE: proxy runs on the Edge runtime on Vercel.
// Do NOT import from lib/auth.js here — it uses `node:crypto` + `Buffer`
// which cannot be bundled for Edge and corrupts the Turbopack import map
// (manifests as the bogus `next/font/googleb` error on Vercel while local
// `next build` appears to pass). Full HMAC verification is done in Node
// API routes / server components; the Edge proxy only does a lightweight
// presence check to decide redirects.
const SESSION_COOKIE = "kamaldeep_admin";

function hasSessionCookie(request) {
  // request.cookies.has() is Edge-safe; verifySessionToken() is Node-only
  return request.cookies.has(SESSION_COOKIE);
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hasSession = hasSessionCookie(request);

  if (pathname.startsWith("/admin")) {
    if (!hasSession && pathname !== "/admin/login") {
      const url = new URL("/admin/login", request.url);
      if (pathname !== "/admin") url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/admin/login") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/admin/login"],
};