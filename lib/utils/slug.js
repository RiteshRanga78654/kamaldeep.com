/**
 * Slugs are the URL of a record, so they are generated once from the title and
 * only changed if the author explicitly asks for a different one.
 */
export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // drop accents: "Kásmír" -> "kasmir"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Suffixes a slug until it is free, so two projects with similar titles can
 * both be saved instead of the second one 409-ing.
 *
 * `exists` is passed in rather than imported here — this file stays free of
 * database code and is usable from the seed script too.
 */
export async function uniqueSlug(base, exists) {
  const root = base || "untitled";
  let slug = root;
  let attempt = 2;

  while (await exists(slug)) {
    slug = `${root}-${attempt}`;
    attempt += 1;
  }

  return slug;
}