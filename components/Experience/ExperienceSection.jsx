"use client";

import React, { useRef, useState } from "react";
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.5 1.2c-.2.5 0 1.1.4 1.4l5 4-3.3 3.3-2-.5c-.3-.1-.7.1-.9.4l-.6.9c-.2.3-.1.8.2 1l2.5 1.8c.3.2.8.3 1.2.1l2.3-1.1 3.3-3.3 4 5c.3.4.9.6 1.4.4l1.2-.5c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
  },
];

// Station x-positions on a 0–1200 viewBox, evenly spaced with breathing room at the ends.
const STATION_X = [140, 600, 1060];
const ROAD_Y = 60;

export function ExperienceSection() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{
        height: "280vh",
        backgroundColor: "#f7f4ee",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.6rem",
              fontFamily: "'Georgia', serif",
              margin: 0,
              color: "#1c1912",
              letterSpacing: "-0.01em",
            }}
          >
            Professional journey
          </h2>
          <p style={{ marginTop: "0.5rem", color: "#8a7e72", fontSize: "1rem" }}>
            Three years, three vehicles — from campus drives to global partnerships.
          </p>
        </div>

        {/* ROAD + VEHICLE */}
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

            {/* Blueprint track */}
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

            {/* Drawn progress */}
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

            {/* Station dots */}
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

          {/* Vehicle marker, positioned in % terms to track the SVG's x-coordinates */}
          <motion.div
            style={{
              position: "absolute",
              left: useTransform(vehicleX, (v) => `${(v / 1200) * 100}%`),
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

        {/* YEAR-ALIGNED CARDS */}
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
                  opacity: isActive ? 1 : isPast ? 0.55 : 0.4,
                  y: isActive ? 0 : 6,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                style={{
                  padding: "22px",
                  borderRadius: "4px",
                  borderLeft: isActive ? "3px solid #b87042" : "3px solid #e4dccd",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: isActive ? "#b87042" : "#a89c8c",
                    }}
                  >
                    {item.period}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#a89c8c" }}>
                    {item.vehicleName}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1c1912",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {item.role}
                </h3>
                <div style={{ fontSize: "0.82rem", color: "#8a7e72", marginBottom: "10px" }}>
                  {item.company}
                </div>

                <p style={{ fontSize: "0.85rem", color: "#5e5447", lineHeight: 1.55, margin: "0 0 14px 0" }}>
                  {item.description}
                </p>

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "0.72rem",
                        padding: "3px 9px",
                        borderRadius: "3px",
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
      </div>
    </section>
  );
}

export default ExperienceSection;