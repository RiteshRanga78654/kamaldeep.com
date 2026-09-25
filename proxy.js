import { NextResponse } from "next/server";
import { requestHasSession } from "./lib/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!requestHasSession(request)) {
      const url = new URL("/login", request.url);
      if (pathname !== "/admin") url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/login") {
    if (requestHasSession(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/login"],
};