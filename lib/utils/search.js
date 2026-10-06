/**
 * Search terms come straight from a query string, so they are escaped before
 * being handed to mongo — otherwise a `.` in a search would match anything.
 */
export function escapeRegex(value) {
  return String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Case-insensitive "contains" across the given fields. Empty term = match all. */
export function contains(term, fields) {
  const cleaned = String(term ?? "").trim();
  if (!cleaned) return null;

  const pattern = new RegExp(escapeRegex(cleaned), "i");

  return { $or: fields.map((field) => ({ [field]: pattern })) };
}