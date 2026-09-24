"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const WORK_ITEMS = [
  {
    title: "Industry–Academia Programs",
    description: "Program design and execution for real-world learning.",
    tags: ["Education", "Partnerships"],
    image: "/images/profile/kamal01/industry.jpeg",
  },
  {
    title: "Student Career Initiatives",
    description: "Initiatives to build industry-ready skills.",
    tags: ["Career", "Learning"],
    image: "/images/blogs/ireed-events/13.png",
  },
  {
    title: "Industry Collaborations",
    description: "Strategic partnerships with organizations.",
    tags: ["Growth", "Business"],
    image: "/images/blogs/ireed-events/14.png",
  },
  {
    title: "Skill Bootcamps",
    description: "Intensive training for modern tech stacks.",
    tags: ["Tech", "Skills"],
    image: "/images/blogs/ireed-events/15.png",
  },
  {
    title: "Global Mentorship",
    description: "Connecting directly with industry leaders.",
    tags: ["Mentorship", "Network"],
    image: "/images/blogs/ireed-events/16.png",
  },
];

const ARROW_UP = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export function SelectedWork() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // 5 cards ke liye Fan-out angles aur positions: [-2, -1, 0, 1, 2]
 const cardSpread = [
  { rotate: -20, x: -320, y: 50 },
  { rotate: -10, x: -160, y: 15 },
  { rotate: 0,   x: 0,    y: 0  },
  { rotate: 10,  x: 160,  y: 15 },
  { rotate: 20,  x: 320,  y: 50 },
];

  return (
    <section id="work" style={{ padding: "1rem 0 4.5rem", overflow: "hidden" }}>
      <div className="container">
        <div className="head-row reveal" style={{ marginBottom: "3rem" }}>
          <div>
            <span className="eyebrow-label">Featured Projects</span>
            <h2 className="section-title serif">Selected Work</h2>
          </div>
          <a href="#" className="view-all">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* Hand Fan Wrapper */}
        <div
          style={{
            position: "relative",
            height: "460px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {WORK_ITEMS.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const basePos = cardSpread[idx];

            // Hover aane par baaki cards kitna side push honge
            let pushX = 0;
            if (hoveredIdx !== null && !isHovered) {
              pushX = idx < hoveredIdx ? -60 : 60;
            }

            return (
              <motion.div
                key={item.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                initial={false}
                animate={{
                  rotate: isHovered ? 0 : basePos.rotate,
                  x: isHovered ? basePos.x : basePos.x + pushX,
                  y: isHovered ? -50 : basePos.y, // Card haath se upar uthega
                  scale: isHovered ? 1.08 : 1,
                  zIndex: isHovered ? 20 : idx + 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "390px",
                  transformOrigin: "bottom center", // Haath ki tarah bottom pivot se rotate hoga
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: isHovered
                    ? "0 25px 40px -10px rgba(0,0,0,0.45)"
                    : "0 10px 20px -5px rgba(0,0,0,0.25)",
                  background: "#111",
                }}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: isHovered ? "brightness(0.9)" : "brightness(0.7)",
                    transition: "filter 0.3s ease",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.95) 100%)",
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px",
                    color: "#fff",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h3>
                    <span>{ARROW_UP}</span>
                  </div>

                  <p
                    style={{
                      margin: "8px 0 12px 0",
                      fontSize: "0.85rem",
                      color: "#ccc",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          backdropFilter: "blur(6px)",
                          padding: "3px 8px",
                          borderRadius: "10px",
                          fontSize: "0.72rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}