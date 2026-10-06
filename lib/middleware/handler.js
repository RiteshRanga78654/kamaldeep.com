import { connectDB } from "@/lib/db/connect";
import { ApiError } from "@/lib/utils/errors";
import { fail } from "@/lib/utils/response";

/**
 * Wraps every /api/v1 route so no handler needs its own try/catch.
 *
 * It connects to MongoDB first, then turns thrown errors into the shared
 * response envelope. Anything that is not an ApiError is a bug, so it is logged
 * and reported as a plain 500 — the message never leaks to the client.
 *
 *   export const GET = handler(async (request) => ok(await list()));
 */
export function handler(fn) {
  return async (...args) => {
    try {
      await connectDB();
      return await fn(...args);
    } catch (error) {
      if (error instanceof ApiError) return fail(error.message, error.status);

      if (error?.code === 11000) return fail("That slug is already taken", 409);
      if (error?.name === "ValidationError") return fail("Some fields are missing or invalid", 422);
      if (error?.name === "CastError") return fail("That id is not valid", 400);

      console.error("[api/v1]", error);
      return fail("Something went wrong on our end", 500);
    }
  };
}