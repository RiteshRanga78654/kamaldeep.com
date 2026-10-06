"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, TriangleAlert, X } from "lucide-react";

/* Re-exported so admin pages can format dates and sizes from one place. */
export { formatBytes, formatDate, formatDateTime, isoDate, timeAgo } from "@/lib/utils/format";

export function cn(...p) {
  return p.filter(Boolean).join(" ");
}

/* ---------------- Card ---------------- */

export function Card({ className, lift = false, hover = false, children, ...rest }) {
  const interactive = hover ? "a-card-lift" : lift ? "a-card-lift" : "";

  return (
    <div className={`a-card ${interactive} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}

export function CardHead({ title, sub, right }) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-5 py-4"
      style={{ borderBottom: "1px solid var(--a-line-soft)" }}
    >
      <div className="min-w-0">
        <h2 className="a-display text-[17px] text-ink">{title}</h2>
        {sub && <p className="mt-0.5 text-[12.5px] text-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* ---------------- Pill ---------------- */

const TONES = {
  olive: "a-pill-olive",
  gold: "a-pill-gold",
  rose: "a-pill-rose",
  muted: "a-pill-muted",
};

export function Pill({ tone = "muted", dot = false, className = "", children }) {
  return (
    <span className={`a-pill ${TONES[tone]} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ---------------- Page head ---------------- */

export function PageHead({ eyebrow, label, title, sub, description, actions }) {
  const overline = eyebrow ?? label;
  const desc = sub ?? description;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {overline && <p className="a-label">{overline}</p>}
        <h1 className="a-display mt-2 text-[27px] leading-tight text-ink md:text-[33px]">{title}</h1>
        {desc && <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-muted">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}

/* ---------------- Buttons ---------------- */

export function Btn({ variant = "line", className, children, ...rest }) {
  const v = {
    primary: "a-btn-primary",
    line: "a-btn-line",
    danger: "a-btn-danger",
  }[variant];
  return (
    <button type="button" className={`a-btn a-focus ${v} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

export function IBtn({ label, className, children, ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} className={`a-icon-btn a-focus ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

/* ---------------- Inputs ---------------- */

export function Label({ htmlFor, label, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11.5px] text-muted">{hint}</p>}
    </div>
  );
}

export function Input({ className, ...rest }) {
  return <input className={`a-input a-focus ${className ?? ""}`} {...rest} />;
}

export function Textarea({ rows = 4, className, ...rest }) {
  return (
    <textarea rows={rows} className={`a-input a-focus resize-y leading-relaxed ${className ?? ""}`} {...rest} />
  );
}

export function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`a-focus relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-olive" : "bg-sand"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-[var(--a-shadow)] transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="a-input a-focus pl-10"
      />
    </div>
  );
}

export function Dropdown({ value, onChange, options, label, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className={cn("a-input a-focus cursor-pointer", className)}
      style={{
        appearance: "none",
        paddingRight: 34,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236e695e' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 11px center",
        backgroundSize: "15px",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function Check({ checked, indeterminate = false, onChange, label }) {
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = Boolean(indeterminate);
        }}
        onChange={onChange}
        aria-label={label}
        className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-[rgba(43,41,36,0.25)] bg-white transition-colors checked:border-olive checked:bg-olive indeterminate:border-olive indeterminate:bg-olive a-focus"
      />
      <svg
        className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-cream opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {indeterminate ? (
          <path d="M5 12h14" />
        ) : (
          <path d="M20 6 9 17l-5-5" />
        )}
      </svg>
    </span>
  );
}

/* ---------------- Modal ---------------- */

export function Modal({ open, onClose, title, sub, description, footer, width, size, children }) {
  const WIDTHS = { sm: "440px", md: "580px", lg: "760px" };
  const maxW = width ?? WIDTHS[size] ?? WIDTHS.md;
  const subText = sub ?? description;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(42,42,38,0.42)] p-0 backdrop-blur-[3px] sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, "cubic-bezier": [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="a-scroll relative my-auto max-h-[92vh] w-full overflow-y-auto rounded-t-[20px] bg-[#fffdf9] sm:rounded-[20px]"
            style={{ maxWidth: maxW, boxShadow: "var(--a-shadow-lg)" }}
          >
            <div
              className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5"
              style={{ borderBottom: "1px solid var(--a-line-soft)", background: "rgba(255,253,249,0.96)", backdropFilter: "blur(8px)" }}
            >
              <div>
                <h2 className="a-display text-[19px] text-ink">{title}</h2>
                {subText && <p className="mt-1 text-[12.5px] text-muted">{subText}</p>}
              </div>
              <IBtn label="Close" onClick={onClose} className="-mt-1 -mr-1.5">
                <X className="h-4 w-4" />
              </IBtn>
            </div>

            <div className="px-6 py-6">{children}</div>

            {footer && (
              <div
                className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2.5 px-6 py-4"
                style={{ borderTop: "1px solid var(--a-line-soft)", background: "rgba(255,253,249,0.96)", backdropFilter: "blur(8px)" }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Empty ---------------- */

export function Empty({ icon: Icon, title, sub, description, action }) {
  const text = sub ?? description;
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sand/50 text-muted">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="a-display text-[18px] text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[13.5px] text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ---------------- Table ---------------- */

export function Toolbar({ children }) {
  return (
    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">{children}</Card>
  );
}

export function Table({ head, children }) {
  return (
    <div className="a-scroll overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr style={{ background: "rgba(245,242,236,0.5)" }}>
            {head.map((column) => (
              <th
                key={column.label}
                className={`a-th px-5 py-3 ${column.hideBelow ?? ""}`}
                style={{ borderBottom: "1px solid var(--a-line-soft)" }}
              >
                {column.sort ? (
                  <button
                    type="button"
                    onClick={column.sort}
                    className="a-focus inline-flex items-center gap-1 text-inherit"
                  >
                    {column.label}
                    <span className="flex flex-col leading-none">
                      <span className={column.sorted === "asc" ? "text-olive" : "opacity-30"}>▲</span>
                      <span className={column.sorted === "desc" ? "text-olive" : "opacity-30"}>▼</span>
                    </span>
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TR({ children, onClick }) {
  return (
    <tr
      className={`a-tr ${onClick ? "cursor-pointer" : ""}`}
      style={{ borderBottom: "1px solid var(--a-line-soft)" }}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TD({ children, className = "" }) {
  return <td className={`px-5 py-3.5 ${className}`}>{children}</td>;
}

/* ---------------- Loading / error states ---------------- */

export function Loading({ rows = 5, label = "Loading" }) {
  return (
    <div className="space-y-3 px-5 py-5" role="status" aria-label={label}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="a-pulse h-11 rounded-xl bg-sand/45"
          style={{ animationDelay: `${i * 70}ms` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(180,80,74,0.1)] text-[#b4504a]">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="a-display text-[18px] text-ink">Could not load this</h3>
      <p className="mt-1.5 max-w-sm text-[13.5px] text-muted">
        {error?.message || "Something went wrong."}
      </p>
      {onRetry && (
        <Btn className="mt-5" onClick={onRetry}>
          Try again
        </Btn>
      )}
    </div>
  );
}

/* ---------------- Confirm ---------------- */

export function Confirm({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel = "Delete",
  busy = false,
  tone = "danger",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Btn onClick={onClose} disabled={busy}>
            Cancel
          </Btn>
          <Btn variant={tone} onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </Btn>
        </>
      }
    >
      <p className="text-[14px] leading-relaxed text-muted">{body}</p>
    </Modal>
  );
}

/* ---------------- Formatting helpers ---------------- */

/** Colours for the status values the database stores in lowercase. */
export const STATUS_TONE = {
  published: "olive",
  draft: "muted",
  new: "rose",
  progress: "gold",
  resolved: "olive",
};

export const PRIORITY_TONE = { high: "rose", medium: "gold", low: "muted" };

export const STATUS_LABEL = {
  published: "Published",
  draft: "Draft",
  new: "New",
  progress: "In Progress",
  resolved: "Resolved",
};

export const PRIORITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

/* ---------------- Pager ---------------- */

export function Pager({ page, pageCount, total, pageSize, onPage, noun = "items" }) {
  const nums = useMemo(() => {
    const out = [];
    const span = 5;
    let s = Math.max(1, page - Math.floor(span / 2));
    const e = Math.min(pageCount, s + span - 1);
    s = Math.max(1, e - span + 1);
    for (let i = s; i <= e; i += 1) out.push(i);
    return out;
  }, [page, pageCount]);

  if (total === 0 || pageCount <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const b = "a-focus inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[13px] font-medium transition-colors";

  return (
    <div
      className="flex flex-col items-center justify-between gap-3 px-5 py-3.5 sm:flex-row"
      style={{ borderTop: "1px solid var(--a-line-soft)" }}
    >
      <p className="text-[12.5px] text-muted">
        <span className="font-medium text-ink">{from}</span>–<span className="font-medium text-ink">{to}</span> of{" "}
        <span className="font-medium text-ink">{total}</span> {noun}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={cn(b, "text-muted hover:bg-sand/60 hover:text-ink disabled:opacity-35 disabled:pointer-events-none")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {nums[0] > 1 && (
          <>
            <button type="button" onClick={() => onPage(1)} className={cn(b, "text-muted hover:bg-sand/60 hover:text-ink")}>
              1
            </button>
            {nums[0] > 2 && <span className="px-1 text-muted">…</span>}
          </>
        )}

        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            aria-label={`Page ${n}`}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              b,
              n === page
                ? "bg-olive text-cream shadow-[0_4px_10px_-4px_rgba(92,102,71,0.85)]"
                : "text-muted hover:bg-sand/60 hover:text-ink",
            )}
          >
            {n}
          </button>
        ))}

        {nums[nums.length - 1] < pageCount && (
          <>
            {nums[nums.length - 1] < pageCount - 1 && <span className="px-1 text-muted">…</span>}
            <button type="button" onClick={() => onPage(pageCount)} className={cn(b, "text-muted hover:bg-sand/60 hover:text-ink")}>
              {pageCount}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
          className={cn(b, "text-muted hover:bg-sand/60 hover:text-ink disabled:opacity-35 disabled:pointer-events-none")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Toasts ---------------- */

const TCtx = createContext(null);

export function ToastHost({ children }) {
  const [items, setItems] = useState([]);

  const drop = useCallback((id) => setItems((p) => p.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (msg, tone = "ok") => {
      const id = Math.random().toString(36).slice(2);
      setItems((p) => [...p, { id, msg, tone }]);
      setTimeout(() => drop(id), 3400);
    },
    [drop],
  );

  const tone = {
    ok: "bg-olive text-cream",
    error: "bg-[#b4504a] text-white",
    bad: "bg-[#b4504a] text-white",
    info: "bg-ink text-cream",
  };

  return (
    <TCtx.Provider value={useMemo(() => ({ push }), [push])}>
      {children}
      <div className="pointer-events-none fixed right-5 bottom-5 z-[90] flex w-[min(360px,calc(100%-2.5rem))] flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 36, transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, "cubic-bezier": [0.22, 1, 0.36, 1] }}
              className={`pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-medium shadow-[var(--a-shadow-lg)] ${tone[t.tone] ?? tone.ok}`}
              role="status"
            >
              <span className="flex-1">{t.msg}</span>
              <button type="button" onClick={() => drop(t.id)} aria-label="Dismiss" className="opacity-60 hover:opacity-100">
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </TCtx.Provider>
  );
}

export function useToast() {
  const c = useContext(TCtx);
  if (!c) throw new Error("useToast must be used inside <ToastHost>");
  return c;
}
