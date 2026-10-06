import { cookies } from "next/headers";
import { buildSessionToken, getCredentials, SESSION_COOKIE, sessionCookieOptions } from "@/lib/middleware/auth";
import { unauthorized } from "@/lib/utils/errors";

/**
 * One admin account, configured through env. No user table — the panel is a
 * single seat, which is all this site needs.
 */
export async function login({ email, password, remember = false }) {
  const expected = getCredentials();

  if (String(email ?? "").trim().toLowerCase() !== expected.email) {
    throw unauthorized("Email or password is incorrect");
  }

  if (String(password ?? "") !== expected.password) {
    throw unauthorized("Email or password is incorrect");
  }

  // "Keep me signed in" caps the cookie at 30 days; otherwise the 12h default.
  const maxAge = remember ? 60 * 60 * 24 * 30 : sessionCookieOptions().maxAge;
  const jar = await cookies();

  jar.set(SESSION_COOKIE, buildSessionToken(), sessionCookieOptions(maxAge));

  return { email: expected.email, role: "admin" };
}

export async function logout() {
  const jar = await cookies();

  jar.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });

  return { loggedOut: true };
}