import { NextResponse } from "next/server";

/**
 * Every /api/v1 response has the same envelope, so the frontend never has to
 * guess which shape it got:
 *
 *   { success: true,  data: ... }
 *   { success: false, error: "..." }
 */

export function ok(data, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function created(data) {
  return ok(data, 201);
}

export function fail(message, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}