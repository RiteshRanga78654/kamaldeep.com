"use client";

import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MOBILE_BREAKPOINT = 640;

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

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const heroRef = useRef(null);
  const isMobile = useIsMobile();

  // Refs for measuring exactly where "J" ends and "A" begins inside PRAJAPATI.
  // Only meaningful on the single-line desktop layout — on mobile the photo
  // uses a simple centered position instead, since the word can wrap.
  const wordRef = useRef(null);
  const partRef = useRef(null); // wraps "PRAJ"
  const [pivotPercent, setPivotPercent] = useState(35); // fallback until measured

  const measurePivot = useCallback(() => {
    if (isMobile) return;
    if (!wordRef.current || !partRef.current) return;
    const wordBox = wordRef.current.getBoundingClientRect();
    const partBox = partRef.current.getBoundingClientRect();
    if (wordBox.width === 0) return;
    const boundary = partBox.right - wordBox.left; // px from left edge of the word to the J/A split
    setPivotPercent((boundary / wordBox.width) * 100);
  }, [isMobile]);

  useLayoutEffect(() => {
    measurePivot();
    window.addEventListener("resize", measurePivot);
    return () => window.removeEventListener("resize", measurePivot);
  }, [measurePivot]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const textMoveX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const textMoveY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const photoMoveX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const photoMoveY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e) => {
    if (isMobile || !heroRef.current) return;
    const { width, height, left, top } = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const headlineFontSize = isMobile
    ? "clamp(2.6rem, 15vw, 4.4rem)"
    : "clamp(4.2rem, 15vw, 13.5rem)";

  const portrait = !imgError ? (
    <img
      src="/images/profile/kamal01/kamal.png"
      alt="Kamaldeep Prajapati"
      onLoad={measurePivot}
      onError={() => setImgError(true)}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        filter: "contrast(1.05) drop-shadow(0 16px 28px rgba(28,25,23,0.16))",
      }}
    />
  ) : (
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 4",
        background: "#ede5d6",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "serif",
        fontSize: "2.4rem",
        color: "#b87042",
      }}
    >
      KP
    </div>
  );

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="home"
      style={{
        position: "relative",
        backgroundColor: "#f7f4ee",
        color: "#1c1917",
     minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: isMobile ? "2.25rem" : "3rem",
        paddingBottom: isMobile ? "2.5rem" : "2.2rem",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Ambient glow — theme unchanged */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "90vw" : "750px",
          height: isMobile ? "320px" : "450px",
          background: "radial-gradient(ellipse at center, rgba(184, 112, 66, 0.09) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
          padding: isMobile ? "0 1.25rem" : 0,
          boxSizing: "border-box",
        }}
      >
        {/* TOP WORD: KAMALDEEP (solid) */}
        <motion.div
          style={{ x: textMoveX, y: textMoveY, width: "100%", textAlign: "center" }}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1
            style={{
              fontSize: headlineFontSize,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.045em",
              lineHeight: 0.86,
              color: "#1c1917",
              margin: 0,
            }}
          >
            Kamaldeep
          </h1>
        </motion.div>

        {/* Mobile: photo sits centered between the two words, no letter-split pin */}
        {isMobile && (
          <motion.div
            style={{
              position: "relative",
              width: "clamp(150px, 42vw, 220px)",
              margin: "0.4rem 0",
              zIndex: 3,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            {portrait}
          </motion.div>
        )}

        {/* BOTTOM WORD: PRAJAPATI (outline) — photo pinned to the J / A boundary on desktop */}
        <motion.div
          style={{
            x: textMoveX,
            y: textMoveY,
            position: "relative",
            width: "100%",
            textAlign: "center",
            marginTop: isMobile ? 0 : "-0.03em",
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <h2
            ref={wordRef}
            style={{
              fontSize: headlineFontSize,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.045em",
              lineHeight: 0.86,
              margin: 0,
              color: "transparent",
              WebkitTextStroke: isMobile ? "1.5px #1c1917" : "2.5px #1c1917",
              display: "inline-block",
            }}
          >
            <span ref={partRef} style={{ marginRight: isMobile ? "0" : "100px" }}>
              PRAJ
            </span>
            <span>APATI</span>
          </h2>

          {/* Desktop only: portrait horizontally pinned to the measured J/A split */}
          {!isMobile && (
            <motion.div
              style={{
                x: photoMoveX,
                y: photoMoveY,
                position: "absolute",
                top: "-24px",
                left: "35%",
                transform: "translateX(-50%)",
                zIndex: 3,
                width: "clamp(230px, 22vw, 340px)",
                pointerEvents: "none",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              {portrait}
              {/* Blend the photo's lower edge into the page background */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "70px",
                  background: "linear-gradient(to top, #fbf9f5 20%, transparent 100%)",
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: isMobile ? "1.8rem" : "1.4rem",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? "0.75rem" : 0,
            padding: isMobile ? 0 : "0 8%",
          }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              backgroundColor: "#1c1917",
              color: "#ffffff",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "0.92rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(28, 25, 23, 0.22)",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            You need a leader
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(28,25,23,0.06)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              backgroundColor: "transparent",
              color: "#1c1917",
              border: "1.5px solid #1c1917",
              padding: "14px 30px",
              borderRadius: "50px",
              fontSize: "0.92rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.2s ease",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            You need an advisor
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            padding: isMobile ? 0 : "0 8%",
            marginTop: isMobile ? "1.4rem" : "0.8rem",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {[
              {
                name: "GitHub",
                href: "https://github.com",
                icon: (
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                ),
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com",
                icon: (
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V9.93H5.06v8.57h2.8z" />
                ),
              },
              {
                name: "Instagram",
                href: "https://instagram.com",
                icon: (
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                ),
              },
            ].map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                whileHover={{ y: -3, scale: 1.12, backgroundColor: "#1c1917", color: "#ffffff", borderColor: "#1c1917" }}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: isMobile ? "44px" : "50px",
                  height: isMobile ? "44px" : "50px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "1.5px solid rgba(28, 25, 23, 0.15)",
                  color: "#1c1917",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  {s.icon}
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;