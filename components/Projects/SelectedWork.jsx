"use client";
import { useState, useEffect, useRef } from "react";
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

const MOBILE_BREAKPOINT = 860;

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

function WorkCard({ item, active, style, onInteract, tabIndex }) {
  return (
    <motion.div
      onClick={onInteract}
      onFocus={onInteract}
      tabIndex={tabIndex}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#111",
        ...style,
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: active ? "brightness(0.9)" : "brightness(0.7)",
          transition: "filter 0.3s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.95) 100%)",
        }}
      />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h3>
          <span>{ARROW_UP}</span>
        </div>
        <p style={{ margin: "8px 0 12px 0", fontSize: "0.85rem", color: "#ccc", lineHeight: "1.3" }}>
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
}

/* ---------------------------------------------------------------- */
/* Mobile: horizontal scroll-snap carousel. The fanned-hand hover     */
/* layout doesn't translate to touch, so cards line up edge-to-edge   */
/* and the "active" one is whichever is centered / tapped, with a     */
/* scroll-reveal fade-in for the whole section.                       */
/* ---------------------------------------------------------------- */
function MobileSelectedWork() {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry.target;
          }
        });
        if (best) {
          const idx = cardRefs.current.indexOf(best);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { root: track, threshold: [0.5, 0.75, 0.95] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: "8px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {WORK_ITEMS.map((item, idx) => (
          <motion.div
            key={item.title}
            ref={(el) => (cardRefs.current[idx] = el)}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: idx * 0.08 }}
            style={{
              flex: "0 0 78%",
              maxWidth: "300px",
              scrollSnapAlign: "center",
            }}
          >
            <WorkCard
              item={item}
              active={activeIdx === idx}
              onInteract={() => setActiveIdx(idx)}
              tabIndex={0}
              style={{ position: "relative", width: "100%", aspectRatio: "280 / 390" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px" }}>
        {WORK_ITEMS.map((_, idx) => (
          <motion.div
            key={idx}
            animate={{
              width: activeIdx === idx ? "20px" : "6px",
              backgroundColor: activeIdx === idx ? "#111" : "#d8d2c6",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ height: "6px", borderRadius: "3px" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Desktop / tablet: original fanned hand-of-cards hover layout       */
/* ---------------------------------------------------------------- */
function DesktopSelectedWork() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const cardSpread = [
    { rotate: -20, x: -320, y: 50 },
    { rotate: -10, x: -160, y: 15 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 10, x: 160, y: 15 },
    { rotate: 20, x: 320, y: 50 },
  ];

  return (
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

        let pushX = 0;
        if (hoveredIdx !== null && !isHovered) {
          pushX = idx < hoveredIdx ? -60 : 60;
        }

        return (
          <motion.div
            key={item.title}
            onMouseEnter={() => setHoveredIdx(idx)}
            initial={{ opacity: 0, y: basePos.y + 40, rotate: basePos.rotate, x: basePos.x, scale: 0.92 }}
            whileInView={{
              opacity: 1,
              rotate: isHovered ? 0 : basePos.rotate,
              x: isHovered ? basePos.x : basePos.x + pushX,
              y: isHovered ? -50 : basePos.y,
              scale: isHovered ? 1.08 : 1,
              zIndex: isHovered ? 20 : idx + 1,
            }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ type: "spring", stiffness: 280, damping: 22, delay: idx * 0.09 }}
            style={{
              position: "absolute",
              width: "280px",
              height: "390px",
              transformOrigin: "bottom center",
              borderRadius: "20px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: isHovered
                ? "0 25px 40px -10px rgba(0,0,0,0.45)"
                : "0 10px 20px -5px rgba(0,0,0,0.25)",
              background: "#111",
            }}
          >
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.95) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h3>
                <span>{ARROW_UP}</span>
              </div>
              <p style={{ margin: "8px 0 12px 0", fontSize: "0.85rem", color: "#ccc", lineHeight: "1.3" }}>
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
  );
}

export function SelectedWork() {
  const isMobile = useIsMobile();

  return (
    <section id="work" style={{ padding: "1rem 0 4.5rem", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="head-row"
          style={{ marginBottom: "3rem" }}
        >
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
        </motion.div>

        {isMobile ? <MobileSelectedWork /> : <DesktopSelectedWork />}
      </div>
    </section>
  );
}

export default SelectedWork;