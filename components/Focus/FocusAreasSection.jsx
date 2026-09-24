"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FOCUS_AREAS = [
  {
    id: 1,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Strategy & Growth",
    description: "Driving business expansion and market opportunities.",
    linkText: "Learn More",
  },
  {
    id: 2,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Partnerships",
    description: "Collaborating with industry and education leaders.",
    linkText: "Learn More",
  },
  {
    id: 3,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Program Development",
    description: "Building learning and career programs.",
    linkText: "Learn More",
  },
  {
    id: 4,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Team Leadership",
    description: "Guiding and empowering high-performing teams.",
    linkText: "Learn More",
  },
  {
    id: 5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Product Innovation",
    description: "Architecting user-centric solutions from ground zero to scale.",
    linkText: "Learn More",
  },
  {
    id: 6,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Global Networking",
    description: "Bridging cross-border ecosystems and executive alliances.",
    linkText: "Learn More",
  },
];

export function FocusAreasSection() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // 6 cards ke hisaab se scroll intervals (1/6 = ~0.166 per stage)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.16) setActiveStep(0);
    else if (latest < 0.33) setActiveStep(1);
    else if (latest < 0.5) setActiveStep(2);
    else if (latest < 0.67) setActiveStep(3);
    else if (latest < 0.84) setActiveStep(4);
    else setActiveStep(5);
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "220vh",
        backgroundColor: "#f7f4ee",
        color: "#1c1917",
        padding: "2rem 2rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "18%",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#8a7e72",
              fontWeight: "600",
            }}
          >
            What I Do
          </span>
          <h2
            style={{
              fontSize: "2.6rem",
              fontFamily: "serif",
              marginTop: "0.4rem",
              marginBottom: "0.5rem",
              letterSpacing: "-0.5px",
            }}
          >
            Key Focus Areas
          </h2>
          <div
            style={{
              width: "45px",
              height: "3px",
              backgroundColor: "#b87042",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Timeline Track & Expanding Square Nodes */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "380px",
          }}
        >
          {/* Background Dotted Line Track */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "25px",
              right: "25px",
              height: "2px",
              background: "repeating-linear-gradient(to right, #cfc5b8 0, #cfc5b8 6px, transparent 6px, transparent 12px)",
              transform: "translateY(-50%)",
              zIndex: 0,
            }}
          />

          {/* Active Liquid Bronze Progress Line */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "25px",
              width: lineWidth,
              maxWidth: "calc(100% - 50px)",
              height: "3px",
              background: "linear-gradient(90deg, #965228 0%, #b87042 70%, #d89665 100%)",
              boxShadow: "0 0 10px rgba(184, 112, 66, 0.4)",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />

          {FOCUS_AREAS.map((item, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveStep(index)}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                  }}
                  animate={{
                    width: isActive ? 270 : 54,
                    height: isActive ? 275 : 48,
                    backgroundColor: isActive ? "#ffffff" : "#ede6da",
                    boxShadow: isActive
                      ? "0 28px 45px -12px rgba(66, 44, 28, 0.16), 0 0 0 1.5px rgba(184, 112, 66, 0.22), 0 8px 16px -4px rgba(0,0,0,0.04)"
                      : "0 3px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                    y: isActive ? -8 : 0,
                  }}
                  whileHover={{
                    scale: isActive ? 1.01 : 1.08,
                    boxShadow: isActive
                      ? "0 32px 50px -10px rgba(66, 44, 28, 0.2), 0 0 0 1.5px #b87042"
                      : "0 6px 14px rgba(184, 112, 66, 0.25), 0 0 0 1.5px rgba(184, 112, 66, 0.4)",
                  }}
                  style={{
                    borderRadius: "18px",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isActive ? "space-between" : "center",
                    alignItems: isActive ? "flex-start" : "center",
                    padding: isActive ? "24px" : "0px",
                    position: "relative",
                  }}
                >
                  {/* Subtle Card Ambient Glow for Active State */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "120px",
                        height: "120px",
                        background: "radial-gradient(circle at top right, rgba(184, 112, 66, 0.08) 0%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* Icon Box with Cursor Pointer & Hover Color Animation */}
                  <motion.div
                    layout="position"
                    whileHover={{
                      scale: 1.12,
                      y: -2,
                      backgroundColor: "#f5e6d6",
                      color: "#965228",
                      boxShadow: "0 4px 10px rgba(184, 112, 66, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    animate={{
                      backgroundColor: isActive ? "#f8ede1" : "transparent",
                      color: isActive ? "#b87042" : "#7d7162",
                    }}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "11px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Expanded Content with Slide-Fade Stagger */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.24, delay: 0.07 }}
                      style={{ marginTop: "auto", width: "100%" }}
                    >
                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "700",
                          margin: "0 0 10px 0",
                          color: "#1c1917",
                          lineHeight: "1.3",
                          fontFamily: "serif",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.86rem",
                          color: "#6b6156",
                          lineHeight: "1.45",
                          margin: "0 0 20px 0",
                        }}
                      >
                        {item.description}
                      </p>

                      <motion.div
                        whileHover="arrowHover"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.82rem",
                          fontWeight: "600",
                          color: "#1c1917",
                          borderBottom: "1.5px solid #1c1917",
                          paddingBottom: "2px",
                          cursor: "pointer",
                        }}
                      >
                        {item.linkText}
                        <motion.svg
                          variants={{
                            arrowHover: { x: 4 },
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </motion.svg>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FocusAreasSection;