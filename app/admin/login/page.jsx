"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Images,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const HIGHLIGHTS = [
  { icon: BarChart3, label: "Traffic & revenue analytics" },
  { icon: FileText, label: "Publish and schedule articles" },
  { icon: Images, label: "Curate your media gallery" },
  { icon: MessageSquare, label: "Triage reader enquiries" },
];

function CredentialsHint() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-[var(--a-line)] bg-[#fbf9f4] px-4 py-3">
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
      <p className="text-[12px] leading-relaxed text-muted">
        Admin credentials are set via the{" "}
        <code className="font-mono text-[11.5px] text-ink">ADMIN_EMAIL</code> and{" "}
        <code className="font-mono text-[11.5px] text-ink">ADMIN_PASSWORD</code> environment
        variables. Ask the site owner if you need access.
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const busy = status === "loading";

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Use at least 6 characters";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, remember }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.error ?? "Those credentials didn't work. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      router.replace("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="grid min-h-screen bg-cream lg:grid-cols-[1.05fr_1fr]">
      {/* ---------------- brand panel ---------------- */}
      <aside className="relative hidden overflow-hidden bg-olive-dark lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="a-drift absolute -top-24 -left-16 h-[420px] w-[420px] rounded-full bg-olive/25 blur-[90px]" />
          <div
            className="a-drift absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-gold/12 blur-[90px]"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,242,236,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,1) 1px, transparent 1px)",
              backgroundSize: "58px 58px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive text-[14px] font-semibold text-cream">
            KP
          </span>
          <span>
            <span className="a-display block text-[17px] leading-tight text-cream">
              Kamaldeep
            </span>
            <span className="block text-[9.5px] font-semibold tracking-[0.18em] text-[rgba(245,242,236,0.4)] uppercase">
              Creator Coach
            </span>
          </span>
        </motion.div>

        <div className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(245,242,236,0.14)] bg-[rgba(245,242,236,0.05)] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[rgba(245,242,236,0.65)] uppercase"
          >
            <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" />
            Admin Console
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="a-display mt-6 max-w-md text-[42px] leading-[1.1] text-cream"
          >
            Everything about your content, in one calm place.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-[rgba(245,242,236,0.58)]"
          >
            Publish articles, curate your gallery and keep on top of every reader who reaches
            out — from a single, focused workspace.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } } }}
            className="mt-9 space-y-3"
          >
            {HIGHLIGHTS.map((h) => (
              <motion.li
                key={h.label}
                variants={{
                  hidden: { opacity: 0, x: -14 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
                }}
                className="flex items-center gap-3 text-[14px] text-[rgba(245,242,236,0.72)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(245,242,236,0.07)] text-gold">
                  <h.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {h.label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative flex items-center gap-2 text-[11.5px] text-[rgba(245,242,236,0.4)]"
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Sessions expire automatically after 12 hours
        </motion.div>
      </aside>

      {/* ---------------- form panel ---------------- */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[400px]">
          <Link
            href="/"
            className="a-focus mb-8 inline-flex items-center gap-1.5 rounded-md text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to website
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="a-label">Welcome back</p>
            <h2 className="a-display mt-2 text-[30px] leading-tight text-ink">
              Sign in to continue
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Enter your credentials to access the dashboard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="a-card mt-7 p-6 sm:p-7"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(92,102,71,0.12)]"
                  >
                    <CheckCircle2 className="h-8 w-8 text-olive" aria-hidden="true" />
                  </motion.span>
                  <h3 className="a-display text-[21px] text-ink">Signed in</h3>
                  <p className="mt-1.5 text-[13.5px] text-muted">Taking you to the dashboard…</p>
                  <div className="mt-6 flex justify-center gap-1.5" role="status" aria-label="Loading dashboard">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-olive"
                        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.14 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <AnimatePresence>
                    {status === "error" && error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="overflow-hidden"
                      >
                        <p className="rounded-xl border border-[rgba(180,80,74,0.28)] bg-[rgba(180,80,74,0.07)] px-4 py-3 text-[13px] text-[#a0433d]">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="login-email" className="mb-1.5 block text-[12.5px] font-medium text-ink">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                      <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: null }));
                        }}
                        disabled={busy}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "err-email" : undefined}
                        placeholder="admin@kamaldeep.com"
                        className="a-input pl-10"
                      />
                    </div>
                    {fieldErrors.email && (
                      <p id="err-email" className="mt-1.5 text-[11.5px] text-[#a0433d]">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="login-password" className="mb-1.5 block text-[12.5px] font-medium text-ink">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: null }));
                        }}
                        disabled={busy}
                        aria-invalid={Boolean(fieldErrors.password)}
                        aria-describedby={fieldErrors.password ? "err-password" : undefined}
                        placeholder="••••••••"
                        className="a-input pl-10 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="a-focus absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-sand/50 hover:text-ink"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p id="err-password" className="mt-1.5 text-[11.5px] text-[#a0433d]">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-muted">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        disabled={busy}
                        className="peer sr-only"
                      />
                      <span className="relative flex h-[18px] w-[32px] shrink-0 items-center rounded-full bg-sand transition-colors peer-checked:bg-olive peer-focus-visible:ring-2 peer-focus-visible:ring-olive peer-focus-visible:ring-offset-2">
                        <motion.span
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 32 }}
                          className="absolute h-[14px] w-[14px] rounded-full bg-white shadow-sm"
                          style={{ left: remember ? 16 : 2 }}
                        />
                      </span>
                      Keep me signed in
                    </label>
                    <button
                      type="button"
                      className="a-focus rounded-md text-[13px] font-medium text-olive transition-colors hover:text-olive-dark"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="a-btn a-btn-primary group w-full !h-11"
                  >
                    {busy ? (
                      <>
                        <svg className="a-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </svg>
                        Signing in…
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <CredentialsHint />
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <p className="mt-6 text-center text-[12px] text-muted">
            Protected area · <span className="text-ink">Kamaldeep.com</span>
          </p>
        </div>
      </main>
    </div>
  );
}
