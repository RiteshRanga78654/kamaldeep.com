"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MOBILE_BREAKPOINT = 720;

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

export function Footer() {
  const isMobile = useIsMobile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#161311",
        color: "#f5efe6",
        padding: isMobile ? "2.75rem 1.25rem 1.75rem" : "3.5rem 1.5rem 2rem",
        borderTop: "1px solid rgba(184, 112, 66, 0.25)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr 1fr",
            gap: isMobile ? "2rem" : "2.5rem",
            paddingBottom: isMobile ? "2rem" : "2.5rem",
            borderBottom: "1px solid rgba(245, 239, 230, 0.1)",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: "#b87042",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}
              >
                KP
              </span>
              <span style={{ fontSize: "1.3rem", fontFamily: "serif", fontWeight: "700" }}>
                Kamaldeep Prajapati
              </span>
            </div>
            <p
              style={{
                color: "#a59b8d",
                fontSize: "0.88rem",
                lineHeight: "1.6",
                maxWidth: isMobile ? "none" : "340px",
                margin: 0,
              }}
            >
              Designing and scaling high-impact industry–academia initiatives, strategic alliances, and executive learning ecosystems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "1.8px",
                color: "#c98a58",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "1fr 1fr",
                gap: "10px 16px",
              }}
            >
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blogs" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
                { label: "About", href: "/#about" },
                { label: "Experience", href: "/#experience" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "#a59b8d",
                    textDecoration: "none",
                    fontSize: "0.86rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e3a774")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a59b8d")}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect / Status Card */}
          <div
            style={{
              backgroundColor: "rgba(245, 239, 230, 0.04)",
              border: "1px solid rgba(184, 112, 66, 0.2)",
              padding: "1.4rem",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                    boxShadow: "0 0 8px #4ade80",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.82rem", color: "#f5efe6", fontWeight: "600" }}>
                  Available for Strategic Alliances
                </span>
              </div>
              <p style={{ color: "#8c8273", fontSize: "0.8rem", margin: 0 }}>
                New Delhi, India • IST (UTC+05:30)
              </p>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "1.2rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "#b87042",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: "10px",
                fontSize: "0.84rem",
                fontWeight: "600",
                textDecoration: "none",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Get in Touch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: isMobile ? "1.6rem" : "1.8rem",
            gap: isMobile ? "1.25rem" : "1rem",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px", order: isMobile ? 1 : 0 }}>
            {[
              {
                name: "LinkedIn",
                icon: <path d="M6.94 8.5H4v11h2.94v-11zM5.47 6.99a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4zM20 13.7c0-3.37-1.8-4.94-4.2-4.94-1.94 0-2.8 1.07-3.28 1.82V8.5H9.58c.04.85 0 11 0 11h2.94v-6.14c0-.33.02-.66.12-.9.27-.66.88-1.35 1.9-1.35 1.34 0 1.88 1.02 1.88 2.52V19.5H19.4l.6-.03V13.7z" />,
              },
              {
                name: "GitHub",
                icon: <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0112 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />,
              },
              {
                name: "X",
                icon: <path d="M18.9 2H22l-7.6 8.7L23 22h-7.1l-5.5-6.9L4 22H1l8.2-9.3L1 2h7.3l5 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />,
              },
            ].map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(245, 239, 230, 0.05)",
                  border: "1px solid rgba(245, 239, 230, 0.1)",
                  color: "#c98a58",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.backgroundColor = "#b87042";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#c98a58";
                  e.currentTarget.style.backgroundColor = "rgba(245, 239, 230, 0.05)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span style={{ fontSize: "0.8rem", color: "#807669", order: isMobile ? 2 : 0 }}>
            © {new Date().getFullYear()} Kamaldeep Prajapati. All rights reserved.
          </span>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              background: "transparent",
              border: "1px solid rgba(245, 239, 230, 0.15)",
              color: "#a59b8d",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              order: isMobile ? 0 : 0,
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;