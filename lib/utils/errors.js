/**
 * An error that already knows which HTTP status it should become.
 *
 * Anything thrown that is *not* an ApiError is treated as a bug and comes back
 * as a generic 500 — see `lib/middleware/handler.js`.
 */
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const badRequest = (message) => new ApiError(400, message);
export const unauthorized = (message = "Please sign in again") => new ApiError(401, message);
export const notFound = (message = "Not found") => new ApiError(404, message);