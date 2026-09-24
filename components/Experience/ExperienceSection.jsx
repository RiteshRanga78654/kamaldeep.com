"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    period: "2022 – 2023",
    role: "Projects & Partnerships",
    company: "IREED India",
    description:
      "Supported business development and partnership initiatives with ground-level activation drives.",
    skills: ["Campus Drives", "Ground Ops", "Outreach"],
    vehicleName: "Bike",
    vehicleIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
  },
  {
    id: 2,
    period: "2023 – 2024",
    role: "Business Development",
    company: "IREED India",
    description:
      "Scaled corporate pipelines, strategic academic tie-ups, client relations, and multi-tier program execution.",
    skills: ["B2B Expansion", "University MoUs", "Enterprise Sales"],
    vehicleName: "Car",
    vehicleIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-3-4H9L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: 3,
    period: "Present",
    role: "Business Head",
    company: "IREED India",
    description:
      "Leading enterprise business operations, apex strategic partnerships and high-impact educational programs globally.",
    skills: ["Executive Strategy", "P&L Management", "Strategic Alliances"],
    vehicleName: "Aeroplane",
    vehicleIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.5 1.2c-.2.5 0 1.1.4 1.4l5 4-3.3 3.3-2-.5c-.3-.1-.7.1-.9.4l-.6.9c-.2.3-.1.8.2 1l2.5 1.8c.3.2.8.3 1.2.1l2.3-1.1 3.3-3.3 4 5c.3.4.9.6 1.4.4l1.2-.5c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
  },
];

const STATION_X = [140, 600, 1060];
const ROAD_Y = 60;
const MOBILE_BREAKPOINT = 900;

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

export function ExperienceSection() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const isMobile = useIsMobile();

  // All hooks initialized unconditionally at the top level.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start end", "end start"] : ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return; // mobile stage is driven by IntersectionObserver instead
    if (latest < 0.34) setActiveStage(0);
    else if (latest < 0.7) setActiveStage(1);
    else setActiveStage(2);
  });

  const pathDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const vehicleX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [STATION_X[0], STATION_X[1], STATION_X[2]]
  );

  const vehicleLeftPercent = useTransform(vehicleX, (v) => `${(v / 1200) * 100}%`);

  // ---- Mobile: scroll-driven active stage + per-card reveal ----
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cardRefs.current.indexOf(entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });

        // Active stage = the entry nearest the vertical center.
        let best = null;
        let bestDist = Infinity;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const dist = Math.abs(
            entry.boundingClientRect.top + entry.boundingClientRect.height / 2 - window.innerHeight / 2
          );
          if (dist < bestDist) {
            bestDist = dist;
            best = entry.target;
          }
        });
        if (best) {
          const idx = cardRefs.current.indexOf(best);
          if (idx !== -1) setActiveStage(idx);
        }
      },
      { threshold: 0.15, rootMargin: "-15% 0px -35% 0px" }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile spine fill: how far down the stack the active stage is.
  const mobileSpineHeight = `${(activeStage / (EXPERIENCES.length - 1)) * 100}%`;

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{
        height: isMobile ? "auto" : "280vh",
        backgroundColor: "#f7f4ee",
        position: "relative",
        padding: isMobile ? "4rem 1.25rem" : "0",
      }}
    >
      <div
        style={{
          position: isMobile ? "relative" : "sticky",
          top: isMobile ? "auto" : 0,
          minHeight: isMobile ? "auto" : "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0" : "0 2rem",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: isMobile ? "2rem" : "3rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.7rem)",
              fontFamily: "'Georgia', serif",
              margin: 0,
              color: "#1c1912",
              letterSpacing: "-0.01em",
            }}
          >
            Professional journey
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              color: "#8a7e72",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              lineHeight: 1.5,
            }}
          >
            Three years, three vehicles — from campus drives to global partnerships.
          </p>
        </motion.div>

        {/* ================= DESKTOP TRACK & VEHICLE (>= 900px) ================= */}
        {!isMobile && (
          <>
            <div style={{ position: "relative", width: "100%", height: "110px" }}>
              <svg
                viewBox={`0 0 1200 ${ROAD_Y + 40}`}
                preserveAspectRatio="none"
                style={{ width: "100%", height: "100%", display: "block" }}
              >
                <defs>
                  <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#965228" />
                    <stop offset="50%" stopColor="#b87042" />
                    <stop offset="100%" stopColor="#c98a54" />
                  </linearGradient>
                </defs>

                <line
                  x1={STATION_X[0]}
                  y1={ROAD_Y}
                  x2={STATION_X[2]}
                  y2={ROAD_Y}
                  stroke="#dfd6c7"
                  strokeWidth="3"
                  strokeDasharray="1 10"
                  strokeLinecap="round"
                />

                <motion.line
                  x1={STATION_X[0]}
                  y1={ROAD_Y}
                  x2={STATION_X[2]}
                  y2={ROAD_Y}
                  stroke="url(#roadGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: pathDraw }}
                />

                {STATION_X.map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={ROAD_Y}
                    r={i <= activeStage ? 5 : 4}
                    fill={i <= activeStage ? "#b87042" : "#dfd6c7"}
                    stroke="#f7f4ee"
                    strokeWidth="3"
                  />
                ))}
              </svg>

              <motion.div
                style={{
                  position: "absolute",
                  left: vehicleLeftPercent,
                  top: `${(ROAD_Y / (ROAD_Y + 40)) * 100}%`,
                  x: "-50%",
                  y: "-50%",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#1c1912",
                  color: "#f7f4ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(28, 25, 18, 0.25), 0 0 0 4px #f7f4ee",
                  zIndex: 10,
                }}
              >
                {EXPERIENCES[activeStage].vehicleIcon}
              </motion.div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginTop: "1.5rem",
              }}
            >
              {EXPERIENCES.map((item, idx) => {
                const isActive = activeStage === idx;
                const isPast = idx < activeStage;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.6 : 0.4,
                      y: isActive ? 0 : 6,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    style={{
                      padding: "24px",
                      borderRadius: "6px",
                      borderLeft: isActive ? "3px solid #b87042" : "3px solid #e4dccd",
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                      boxShadow: isActive ? "0 10px 30px rgba(28,25,18,0.06)" : "none",
                      transition: "background-color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: isActive ? "#b87042" : "#a89c8c" }}>
                        {item.period}
                      </span>
                      <span style={{ fontSize: "0.74rem", color: "#a89c8c" }}>{item.vehicleName}</span>
                    </div>

                    <h3 style={{ margin: "0 0 4px 0", fontSize: "1.15rem", fontWeight: 700, color: "#1c1912", fontFamily: "'Georgia', serif" }}>
                      {item.role}
                    </h3>
                    <div style={{ fontSize: "0.82rem", color: "#8a7e72", marginBottom: "10px" }}>{item.company}</div>

                    <p style={{ fontSize: "0.86rem", color: "#5e5447", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "0.72rem",
                            padding: "3px 9px",
                            borderRadius: "4px",
                            background: isActive ? "#f7f1e8" : "#f0ece3",
                            color: isActive ? "#8f4d22" : "#8a7e72",
                            fontWeight: 600,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= MOBILE VERTICAL TIMELINE (< 900px) ================= */}
        {/* Scroll-driven: spine fills, vehicle badge glides, and each card    */}
        {/* fades/slides in as it enters the viewport (IntersectionObserver). */}
        {isMobile && (
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.8rem", paddingLeft: "0.5rem" }}>
            {/* Static dotted spine */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                bottom: "20px",
                left: "20px",
                width: "2px",
                background:
                  "repeating-linear-gradient(to bottom, #ddd2c0 0, #ddd2c0 6px, transparent 6px, transparent 12px)",
                zIndex: 0,
              }}
            />
            {/* Animated fill spine, grows with active stage */}
            <motion.div
              animate={{ height: mobileSpineHeight }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                width: "2px",
                background: "linear-gradient(180deg, #965228 0%, #b87042 60%, #c98a54 100%)",
                boxShadow: "0 0 8px rgba(184, 112, 66, 0.35)",
                zIndex: 1,
              }}
            />

            {EXPERIENCES.map((item, idx) => {
              const isActive = activeStage === idx;
              const isVisible = visibleCards.includes(idx);

              return (
                <motion.div
                  key={item.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1.1rem", zIndex: 2 }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#b87042" : "#1c1912",
                        scale: isActive ? 1.12 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        color: "#f7f4ee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive
                          ? "0 6px 16px rgba(184, 112, 66, 0.35), 0 0 0 3px #f7f4ee"
                          : "0 4px 12px rgba(28, 25, 18, 0.22), 0 0 0 3px #f7f4ee",
                      }}
                    >
                      {item.vehicleIcon}
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "#ffffff" : "#fbf9f5",
                      boxShadow: isActive
                        ? "0 10px 26px rgba(28,25,18,0.08)"
                        : "0 4px 14px rgba(28, 25, 18, 0.04)",
                      scale: isActive ? 1 : 0.985,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      flex: 1,
                      padding: "18px",
                      borderRadius: "8px",
                      border: "1px solid rgba(28, 25, 18, 0.08)",
                      borderLeft: isActive ? "3px solid #b87042" : "3px solid #e4dccd",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#b87042" }}>{item.period}</span>
                      <span style={{ fontSize: "0.75rem", color: "#8a7e72" }}>{item.vehicleName}</span>
                    </div>

                    <h3 style={{ margin: "0 0 3px 0", fontSize: "1.1rem", fontWeight: 700, color: "#1c1912", fontFamily: "'Georgia', serif" }}>
                      {item.role}
                    </h3>
                    <div style={{ fontSize: "0.82rem", color: "#8a7e72", marginBottom: "8px" }}>{item.company}</div>

                    <p style={{ fontSize: "0.86rem", color: "#5e5447", lineHeight: 1.5, margin: "0 0 12px 0" }}>
                      {item.description}
                    </p>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "0.72rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            background: "#f7f1e8",
                            color: "#8f4d22",
                            fontWeight: 600,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;