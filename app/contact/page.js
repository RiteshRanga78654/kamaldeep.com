"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Check, Copy, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("contact@ireedindia.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1000);
  };

  return (
    <main
      style={{
        backgroundColor: "#f7f4ee",
        minHeight: "100vh",
        color: "#1c1917",
        paddingTop: "7.5rem",
        paddingBottom: "6rem",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* HEADER SECTION */}
        <div style={{ maxWidth: "680px", marginBottom: "3.8rem" }}>
          <span
            style={{
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              color: "#8a7e72",
              fontWeight: "700",
              display: "block",
              marginBottom: "0.8rem",
            }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontFamily: "serif",
              lineHeight: "1.12",
              letterSpacing: "-0.8px",
              color: "#1c1917",
              margin: 0,
            }}
          >
            Let’s start a conversation.
          </h1>
          <p
            style={{
              marginTop: "1.2rem",
              fontSize: "1.05rem",
              lineHeight: "1.65",
              color: "#685f54",
            }}
          >
            Open for strategic alliances, executive program development, or visionary collaborations. Drop a note below or connect directly.
          </p>
        </div>

        {/* 2-COLUMN PREMIUM GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          
          {/* LEFT: INTERACTIVE HOVER CARDS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* Card 1: Copy Email */}
            <motion.div
              onClick={handleCopy}
              whileHover={{ y: -6, backgroundColor: "#1c1917", color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 28px",
                border: "1px solid rgba(184, 112, 66, 0.18)",
                cursor: "pointer",
                boxShadow: "0 8px 24px -6px rgba(66, 44, 28, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "border-color 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "#f7f1e8",
                    color: "#b87042",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "600", display: "block" }}>
                    Email Wire
                  </span>
                  <span style={{ fontSize: "0.98rem", fontWeight: "700", marginTop: "2px", display: "block" }}>
                    contact@ireedindia.com
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: copied ? "#22c55e" : "rgba(184, 112, 66, 0.12)",
                  color: copied ? "#ffffff" : "#b87042",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </div>
            </motion.div>

            {/* Card 2: Location Card */}
            <motion.div
              whileHover={{ y: -6, backgroundColor: "#1c1917", color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 28px",
                border: "1px solid rgba(184, 112, 66, 0.18)",
                boxShadow: "0 8px 24px -6px rgba(66, 44, 28, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#f7f1e8",
                  color: "#b87042",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "600", display: "block" }}>
                  Headquarters
                </span>
                <span style={{ fontSize: "0.98rem", fontWeight: "700", marginTop: "2px", display: "block" }}>
                  New Delhi, India
                </span>
              </div>
            </motion.div>

            {/* Card 3: Social Hub with Individual Hover Pills */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 28px",
                border: "1px solid rgba(184, 112, 66, 0.18)",
                boxShadow: "0 8px 24px -6px rgba(66, 44, 28, 0.05)",
              }}
            >
              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1.2px", color: "#8a7e72", fontWeight: "600", display: "block", marginBottom: "14px" }}>
                Executive Profiles
              </span>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[
                  { name: "LinkedIn", href: "#" },
                  { name: "Twitter / X", href: "#" },
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.04, backgroundColor: "#b87042", color: "#ffffff", borderColor: "#b87042" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      backgroundColor: "#fcfbf9",
                      border: "1px solid rgba(28,25,23,0.12)",
                      fontSize: "0.84rem",
                      fontWeight: "600",
                      color: "#1c1917",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.name} <ArrowUpRight size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: CLEAN FORM */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "36px 38px",
              border: "1px solid rgba(184, 112, 66, 0.18)",
              boxShadow: "0 18px 40px -12px rgba(66, 44, 28, 0.07)",
            }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "3rem 1rem" }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#f7f1e8",
                    color: "#b87042",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.2rem auto",
                  }}
                >
                  <Check size={28} />
                </div>
                <h3 style={{ fontFamily: "serif", fontSize: "1.7rem", margin: "0 0 8px 0" }}>
                  Message Transmitted
                </h3>
                <p style={{ color: "#685f54", fontSize: "0.92rem", lineHeight: "1.6", maxWidth: "360px", margin: "0 auto 2rem auto" }}>
                  Thank you for reaching out. I will review your message and connect back shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  style={{
                    backgroundColor: "#1c1917",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Send Another Note
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#38312b", marginBottom: "6px" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(28, 25, 23, 0.12)",
                      backgroundColor: "#fcfbf9",
                      fontSize: "0.9rem",
                      outline: "none",
                      color: "#1c1917",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#b87042")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(28, 25, 23, 0.12)")}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#38312b", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(28, 25, 23, 0.12)",
                      backgroundColor: "#fcfbf9",
                      fontSize: "0.9rem",
                      outline: "none",
                      color: "#1c1917",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#b87042")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(28, 25, 23, 0.12)")}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#38312b", marginBottom: "6px" }}>
                    Subject / Discussion Scope
                  </label>
                  <input
                    type="text"
                    placeholder="Partnership, Speaking, or Advisory"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(28, 25, 23, 0.12)",
                      backgroundColor: "#fcfbf9",
                      fontSize: "0.9rem",
                      outline: "none",
                      color: "#1c1917",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#b87042")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(28, 25, 23, 0.12)")}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#38312b", marginBottom: "6px" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your thoughts or proposition..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(28, 25, 23, 0.12)",
                      backgroundColor: "#fcfbf9",
                      fontSize: "0.9rem",
                      outline: "none",
                      color: "#1c1917",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#b87042")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(28, 25, 23, 0.12)")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  style={{
                    backgroundColor: "#b87042",
                    color: "#ffffff",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "12px",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                    boxShadow: "0 10px 24px -4px rgba(184, 112, 66, 0.35)",
                  }}
                >
                  {isSubmitting ? "Dispatching..." : <>Send Message <Send size={15} /></>}
                </motion.button>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}