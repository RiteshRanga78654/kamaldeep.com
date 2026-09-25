"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export async function api(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const headers = isForm
    ? options.headers
    : options.body
      ? { "Content-Type": "application/json", ...(options.headers || {}) }
      : options.headers;
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired — please sign in again");
  }
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="adm-toast-wrap">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24 }}
              className={`adm-toast ${toast.type}`}
            >
              {toast.type === "error" ? <AlertCircle size={16} color="#ff8f7a" /> : <CheckCircle2 size={16} color="#7bd6ae" />}
              <span>{toast.message}</span>
              <button onClick={() => remove(toast.id)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", marginLeft: "6px", display: "flex" }}>
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export function Spinner() {
  return <span className="adm-spinner" aria-label="Loading" />;
}

export function EmptyState({ icon, title, sub }) {
  return (
    <div className="adm-empty">
      {icon && <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px", opacity: 0.5 }}>{icon}</div>}
      <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.2rem", color: "#211c16", margin: "0 0 4px 0" }}>{title}</h3>
      {sub && <p style={{ fontSize: "0.86rem", margin: 0 }}>{sub}</p>}
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide = false }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="adm-modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="adm-modal"
            style={{ maxWidth: wide ? 820 : 640 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-modal-head">
              <h3 className="adm-modal-title">{title}</h3>
              <button className="adm-modal-close" onClick={onClose} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="adm-modal-body">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Field({ label, children, hint }) {
  return (
    <div className="adm-field">
      {label && <label className="adm-label">{label}</label>}
      {children}
      {hint && <div style={{ fontSize: "0.74rem", color: "#a09080", marginTop: "5px" }}>{hint}</div>}
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Delete", busy = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p style={{ color: "#5c5347", fontSize: "0.92rem", lineHeight: "1.6", margin: "0 0 22px 0" }}>{message}</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button className="adm-btn adm-btn-ghost" onClick={onClose} disabled={busy}>
          Cancel
        </button>
        <button className="adm-btn adm-btn-danger" onClick={onConfirm} disabled={busy}>
          {busy ? <Spinner /> : null}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}