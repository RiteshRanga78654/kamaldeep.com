"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Check, Copy, ArrowUpRight, Clock, ShieldCheck, Loader2 } from "lucide-react";

const scopes = ["Partnership", "Strategic Advisory", "Executive Program", "Other"];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Strategic Advisory",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("kamaldeep.prajapati@ireedindia.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      style={{
        backgroundColor: "#f6f4ee",
        minHeight: "100vh",
        color: "#1c1917",
        paddingTop: "5.5rem",
        paddingBottom: "5.5rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* HEADER SECTION */}
        <div style={{ maxWidth: "700px", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "rgba(184, 112, 66, 0.08)",
              border: "1px solid rgba(184, 112, 66, 0.15)",
              borderRadius: "100px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.76rem",
                textTransform: "uppercase",
                letterSpacing: "1.4px",
                color: "#b87042",
                fontWeight: "700",
              }}
            >
              Direct Inquiry Line
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.3rem, 4.2vw, 3.4rem)",
              fontFamily: "Georgia, serif",
              lineHeight: "1.14",
              letterSpacing: "-0.5px",
              color: "#1c1917",
              margin: 0,
            }}
          >
            Let’s start an executive dialogue.
          </h1>
          <p
            style={{
              marginTop: "0.9rem",
              fontSize: "1.02rem",
              lineHeight: "1.65",
              color: "#685f54",
              maxWidth: "580px",
            }}
          >
            Reach out regarding leadership alliances, strategic advisory, or joint institutional ventures.
          </p>
        </div>

        {/* 2-COLUMN BALANCED GRID (Equal Height Alignment) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          
          {/* LEFT COLUMN: EQUAL STRETCHED CARDS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              height: "100%",
            }}
          >
            {/* Card 1: Copy Email */}
            <motion.div
              onClick={handleCopy}
              whileHover={{ y: -3, borderColor: "rgba(184, 112, 66, 0.45)" }}
              transition={{ duration: 0.2 }}
              style={{
                flex: "1",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 28px",
                border: "1px solid rgba(28, 25, 23, 0.08)",
                cursor: "pointer",
                boxShadow: "0 10px 28px -10px rgba(66, 44, 28, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "100px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    backgroundColor: "#f9f4ee",
                    color: "#b87042",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "700", display: "block" }}>
                    Official Wire
                  </span>
                  <span style={{ fontSize: "0.98rem", fontWeight: "700", color: "#1c1917", marginTop: "3px", display: "block" }}>
                    contact@ireedindia.com
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "11px",
                  backgroundColor: copied ? "#22c55e" : "#faf7f2",
                  color: copied ? "#ffffff" : "#b87042",
                  border: copied ? "none" : "1px solid rgba(184, 112, 66, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={15} />}
              </div>
            </motion.div>

            {/* Card 2: Location Card */}
            <motion.div
              whileHover={{ y: -3, borderColor: "rgba(184, 112, 66, 0.45)" }}
              transition={{ duration: 0.2 }}
              style={{
                flex: "1",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 28px",
                border: "1px solid rgba(28, 25, 23, 0.08)",
                boxShadow: "0 10px 28px -10px rgba(66, 44, 28, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                minHeight: "100px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#f9f4ee",
                  color: "#b87042",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "700", display: "block" }}>
                  Operational Base
                </span>
                <span style={{ fontSize: "0.98rem", fontWeight: "700", color: "#1c1917", marginTop: "3px", display: "block" }}>
                  New Delhi, India
                </span>
              </div>
            </motion.div>

            {/* Card 3: Social & Response Window */}
            <div
              style={{
                flex: "1.3",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "26px 28px",
                border: "1px solid rgba(28, 25, 23, 0.08)",
                boxShadow: "0 10px 28px -10px rgba(66, 44, 28, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div>
                <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "700", display: "block", marginBottom: "12px" }}>
                  Direct Leadership Channels
                </span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {[
                    { name: "LinkedIn", href: "#" },
                    { name: "Twitter / X", href: "#" },
                  ].map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      whileHover={{ scale: 1.03, backgroundColor: "#1c1917", color: "#ffffff", borderColor: "#1c1917" }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "10px",
                        backgroundColor: "#faf8f5",
                        border: "1px solid rgba(28, 25, 23, 0.12)",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        color: "#1c1917",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                    >
                      {item.name} <ArrowUpRight size={14} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingTop: "14px",
                  marginTop: "16px",
                  borderTop: "1px solid rgba(28, 25, 23, 0.07)",
                  color: "#6b635b",
                  fontSize: "0.82rem",
                }}
              >
                <Clock size={15} color="#b87042" />
                <span>Response timeline: <strong>Under 24 business hours</strong></span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: EQUAL STRETCHED FORM BOX */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "36px 38px",
              border: "1px solid rgba(28, 25, 23, 0.08)",
              boxShadow: "0 18px 42px -12px rgba(66, 44, 28, 0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxSizing: "border-box",
              height: "100%",
            }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ textAlign: "center", padding: "2rem 1rem" }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(34, 197, 94, 0.12)",
                      color: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.4rem auto",
                    }}
                  >
                    <Check size={30} />
                  </div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.85rem", margin: "0 0 10px 0" }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: "#685f54", fontSize: "0.95rem", lineHeight: "1.6", maxWidth: "380px", margin: "0 auto 2rem auto" }}>
                    Your brief has been forwarded directly to our leadership desk. We will review and respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({ name: "", email: "", subject: "Strategic Advisory", message: "" });
                    }}
                    style={{
                      backgroundColor: "#1c1917",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px 26px",
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Compose Another Note
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", height: "100%", justifyContent: "space-between" }}>
                  
                  {/* Inputs Group */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    
                    {/* Name + Email Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#38312b", marginBottom: "6px" }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Vikram Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid rgba(28, 25, 23, 0.12)",
                            backgroundColor: "#fcfbf9",
                            fontSize: "0.88rem",
                            outline: "none",
                            color: "#1c1917",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#38312b", marginBottom: "6px" }}>
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@enterprise.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid rgba(28, 25, 23, 0.12)",
                            backgroundColor: "#fcfbf9",
                            fontSize: "0.88rem",
                            outline: "none",
                            color: "#1c1917",
                          }}
                        />
                      </div>
                    </div>

                    {/* Scope Selector Chips */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#38312b", marginBottom: "8px" }}>
                        Inquiry Scope
                      </label>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {scopes.map((scope) => {
                          const isSelected = formData.subject === scope;
                          return (
                            <button
                              type="button"
                              key={scope}
                              onClick={() => setFormData({ ...formData, subject: scope })}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: "0.78rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                border: isSelected ? "1px solid #b87042" : "1px solid rgba(28, 25, 23, 0.1)",
                                backgroundColor: isSelected ? "#b87042" : "#faf8f5",
                                color: isSelected ? "#ffffff" : "#685f54",
                                transition: "all 0.15s ease",
                              }}
                            >
                              {scope}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#38312b", marginBottom: "6px" }}>
                        Proposition / Brief *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Outline the nature of collaboration or objectives..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: "1px solid rgba(28, 25, 23, 0.12)",
                          backgroundColor: "#fcfbf9",
                          fontSize: "0.88rem",
                          outline: "none",
                          color: "#1c1917",
                          resize: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        width: "100%",
                        backgroundColor: "#1c1917",
                        color: "#ffffff",
                        border: "none",
                        padding: "14px 20px",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 10px 24px -6px rgba(28, 25, 23, 0.25)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Transmitting...
                        </>
                      ) : (
                        <>
                          Submit Inquiry <Send size={15} />
                        </>
                      )}
                    </motion.button>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#8a7e72", fontSize: "0.74rem", marginTop: "10px" }}>
                      <ShieldCheck size={14} />
                      <span>Transmitted securely with strict executive confidentiality.</span>
                    </div>
                    {submitError && (
                      <div style={{ marginTop: "12px", padding: "10px 14px", borderRadius: "10px", backgroundColor: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#b91c1c", fontSize: "0.82rem" }}>
                        {submitError}
                      </div>
                    )}
                  </div>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </main>
  );
}