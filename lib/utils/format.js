/**
 * Date and size formatting shared by the public pages and the admin panel.
 * No React, no Node — safe to import from both.
 */

export function isoDate(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

/** "26 Sep 2026" */
export function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** "26 Sep 2026, 14:30" */
export function formatDateTime(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "3 hours ago" */
export function timeAgo(value) {
  if (!value) return "";

  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return "just now";

  const units = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [size, name] of units) {
    if (seconds >= size) {
      const amount = Math.floor(seconds / size);
      return `${amount} ${name}${amount === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
}

/** "2.4 MB" */
export function formatBytes(bytes) {
  if (!bytes) return "—";

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}