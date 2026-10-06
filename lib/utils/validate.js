import { badRequest } from "@/lib/utils/errors";

/**
 * Small helpers that turn whatever the request body happens to contain into
 * the exact shape a mongoose field expects. The admin sends real strings and
 * arrays; these make that explicit and reject the rest.
 */

/** Trimmed string, or "" when absent. */
export function text(value, max = 4000) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
}

/** "a, b ,c" or ["a","b"] -> ["a","b"]. Blank entries are dropped. */
export function list(value, max = 60) {
  const items = Array.isArray(value)
    ? value
    : String(value ?? "").split(",");

  return items.map((item) => String(item).trim()).filter(Boolean).slice(0, max);
}

/** Body paragraphs: an array of strings, or one string split on blank lines. */
export function paragraphs(value, max = 200) {
  if (Array.isArray(value)) return value.map((v) => text(v)).filter(Boolean).slice(0, max);
  return String(value ?? "")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .slice(0, max);
}

/** [{ title, text }] — used by project approach steps. */
export function steps(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: text(item?.title, 160),
      text: text(item?.text, 2000),
    }))
    .filter((item) => item.title || item.text);
}

/** [{ value, label }] — the big numbers on a project page. */
export function outcomes(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      value: text(item?.value, 40),
      label: text(item?.label, 120),
    }))
    .filter((item) => item.value || item.label);
}

export function oneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

export function bool(value) {
  return value === true || value === "true" || value === "on" || value === 1;
}

export function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Throws a 400 with a readable message. */
export function require_(value, field) {
  if (!text(value)) throw badRequest(`${field} is required`);
  return text(value);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function requireEmail(value) {
  const email = text(value, 200).toLowerCase();
  if (!EMAIL.test(email)) throw badRequest("Please enter a valid email address");
  return email;
}