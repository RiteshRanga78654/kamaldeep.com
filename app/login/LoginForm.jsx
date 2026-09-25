"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Invalid credentials");
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      className="login-card"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="login-brand-mark">K</div>
      <div className="login-title-wrap">
        <div className="login-kicker">
          <ShieldCheck size={13} /> Restricted area
        </div>
        <h1 className="login-title">Control Room</h1>
        <p className="login-sub">Sign in to manage blogs, inquiries and the gallery.</p>
      </div>

      <label className="login-label" htmlFor="login-user">Username</label>
      <div className="login-input-wrap">
        <User size={16} />
        <input
          id="login-user"
          className="login-input"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          required
        />
      </div>

      <label className="login-label" htmlFor="login-pass">Password</label>
      <div className="login-input-wrap">
        <Lock size={16} />
        <input
          id="login-pass"
          className="login-input"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          className="login-eye"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <div className="login-error">{error}</div>}

      <motion.button
        type="submit"
        className="login-submit"
        disabled={busy}
        whileHover={busy ? {} : { y: -2 }}
        whileTap={busy ? {} : { scale: 0.98 }}
      >
        {busy ? <span className="login-spinner" /> : "Sign in"}
        <ArrowRight size={16} />
      </motion.button>

      <p className="login-foot">Authorized personnel only. All activity is on your own stack.</p>
    </motion.form>
  );
}