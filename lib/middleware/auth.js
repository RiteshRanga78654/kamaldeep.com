import crypto from "node:crypto";
import { cookies } from "next/headers";
import { unauthorized } from "@/lib/utils/errors";

/**
 * Admin session, as a signed cookie.
 *
 * The cookie holds `{ role, exp }` plus an HMAC signature, so it cannot be
 * forged or edited by hand.
 *
 * NOTE: `proxy.js` deliberately does not import this file — it runs on the Edge
 * runtime where `node:crypto` and `Buffer` are unavailable. The proxy only
 * checks that the cookie is present; this module is the real gate.
 */

export const SESSION_COOKIE = "kamaldeep_admin";

const SESSION_HOURS = 12;

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || "kamaldeep-admin-secret-change-me";
}

export function getCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@kamaldeep.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
  };
}

export function sessionCookieOptions(maxAge = SESSION_HOURS * 60 * 60) {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  };
}

export function buildSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + SESSION_HOURS * 60 * 60 * 1000 }),
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;

  const cut = token.lastIndexOf(".");
  if (cut < 0) return false;

  const payload = token.slice(0, cut);
  const signature = token.slice(cut + 1);

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  // Compare as buffers so the check takes the same time whatever was sent.
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length) return false;
  if (!crypto.timingSafeEqual(given, wanted)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.role === "admin" && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function hasSessionCookie(request) {
  return Boolean(request?.cookies?.get?.(SESSION_COOKIE)?.value);
}

/** Throws a 401 unless a valid session cookie is present. */
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!verifySessionToken(token)) throw unauthorized();

  return { role: "admin" };
}