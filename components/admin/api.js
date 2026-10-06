"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * The admin panel's single door to the backend.
 *
 * Every route lives under /api/v1 and answers with the same envelope
 * ({ success, data } / { success, error }), so unwrapping and error messages
 * are handled once here instead of in every page.
 */

const BASE = "/api/v1";

async function request(path, { method = "GET", body, form } = {}) {
  const options = { method, credentials: "same-origin" };

  if (form) {
    options.body = form;
  } else if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${BASE}${path}`, options);
  } catch {
    throw new Error("Could not reach the server. Is it running?");
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return payload.data;
}

function query(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value && value !== "all"),
  ).toString();

  return search ? `?${search}` : "";
}

export const api = {
  auth: {
    login: (body) => request("/auth/login", { method: "POST", body }),
    logout: () => request("/auth/logout", { method: "POST" }),
    me: () => request("/auth/me"),
  },

  stats: () => request("/stats"),

  projects: {
    list: (params) => request(`/projects${query(params)}`),
    create: (body) => request("/projects", { method: "POST", body }),
    update: (id, body) => request(`/projects/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/projects/${id}`, { method: "DELETE" }),
  },

  articles: {
    list: (params) => request(`/articles${query(params)}`),
    create: (body) => request("/articles", { method: "POST", body }),
    update: (id, body) => request(`/articles/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/articles/${id}`, { method: "DELETE" }),
  },

  gallery: {
    list: (params) => request(`/gallery${query(params)}`),
    upload: (form) => request("/gallery", { method: "POST", form }),
    update: (id, body) => request(`/gallery/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/gallery/${id}`, { method: "DELETE" }),
  },

  queries: {
    list: (params) => request(`/queries${query(params)}`),
    update: (id, body) => request(`/queries/${id}`, { method: "PUT", body }),
    remove: (id) => request(`/queries/${id}`, { method: "DELETE" }),
  },

  uploads: {
    image: (file, folder) => {
      const form = new FormData();
      form.append("file", file);
      if (folder) form.append("folder", folder);

      return request("/uploads", { method: "POST", form });
    },
  },
};

/**
 * Loads a resource once and whenever `key` changes, tracking loading and error
 * state so pages do not each reinvent it.
 *
 *   const { data, loading, error, reload } = useResource(
 *     () => api.projects.list({ status }),
 *     `${status}:${search}`,
 *   );
 */
export function useResource(load, key) {
  const latest = useRef(load);

  useEffect(() => {
    latest.current = load;
  }, [load]);

  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setTick((value) => value + 1);
  }, []);

  // The fetch itself lives in the effect; `setState` only runs once the request
  // settles, so nothing re-renders synchronously while mounting.
  useEffect(() => {
    let alive = true;

    latest
      .current()
      .then((data) => {
        if (alive) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (alive) setState({ data: null, loading: false, error });
      });

    return () => {
      alive = false;
    };
  }, [key, tick]);

  return { ...state, reload, setData: (data) => setState((prev) => ({ ...prev, data })) };
}

/** Wraps a save/delete call so a page can show a toast and disable its button. */
export function useAction() {
  const [busy, setBusy] = useState(false);

  const run = useCallback(async (work) => {
    setBusy(true);
    try {
      await work();
      return true;
    } catch {
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  return { busy, run };
}

/**
 * Client-side pagination for a list that is already in memory.
 *
 * Filtering and sorting stay on the client too — a few hundred rows is
 * cheaper to sort in the browser than to re-request, and it keeps the filter
 * row instant.
 */
export function usePaged(rows, pageSize = 8) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount);

  const slice = useMemo(
    () => rows.slice((current - 1) * pageSize, current * pageSize),
    [rows, current, pageSize],
  );

  return { page: current, pageCount, pageSize, total: rows.length, rows: slice, onPage: setPage };
}

/** Sorts a copy of `rows` by one key, toggling direction when the key repeats. */
export function useSort(rows, initial = { key: "updatedAt", direction: "desc" }) {
  const [sort, setSort] = useState(initial);

  const toggle = useCallback((key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "desc" },
    );
  }, []);

  const sorted = useMemo(() => {
    const copy = [...rows];

    copy.sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];

      if (typeof left === "number" && typeof right === "number") {
        return sort.direction === "asc" ? left - right : right - left;
      }

      const result = String(left ?? "").localeCompare(String(right ?? ""));

      return sort.direction === "asc" ? result : -result;
    });

    return copy;
  }, [rows, sort]);

  return { sorted, sort, toggle };
}

/** Case-insensitive "does any of these fields contain the term". */
export function matchesSearch(row, term, fields) {
  const needle = term.trim().toLowerCase();
  if (!needle) return true;

  return fields.some((field) => {
    const value = row[field];

    if (Array.isArray(value)) return value.join(" ").toLowerCase().includes(needle);

    return String(value ?? "").toLowerCase().includes(needle);
  });
}