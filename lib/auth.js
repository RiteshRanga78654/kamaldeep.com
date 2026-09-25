import crypto from "node:crypto";

export const SESSION_COOKIE = "kamaldeep_admin";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || "kamaldeep-admin-secret-change-me";
}

export function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "kamaldeep2025",
  };
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
  };
}

export function buildSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + SESSION_DURATION_MS })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.role === "admin" && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function requestHasSession(request) {
  const token = request?.cookies?.get?.(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}