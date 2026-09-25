import { NextResponse } from "next/server";
import { buildSessionToken, getCredentials, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "").trim();
    const { username: expectedUser, password: expectedPass } = getCredentials();

    if (!username || !password || username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, buildSessionToken(), sessionCookieOptions());
    return res;
  } catch (e) {
    console.error("login route error:", e);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}