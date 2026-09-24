"use client";

import { useEffect, useLayoutEffect, useId, useRef, useState } from "react";

const STATS = [
  {
    target: 5,
    suffix: "+",
    label: "Years of Experience",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 21V7l8-4 8 4v14" /><path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    target: 50,
    suffix: "+",
    label: "Industry Partnerships",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.5" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6M16 15.5c2.7.4 4 2 4 5.5" />
      </svg>
    ),
  },
  {
    target: 10,
    suffix: "K+",
    label: "Students Impacted",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 9L12 4 2 9l10 5 10-5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      </svg>
    ),
  },
  {
    target: 100,
    suffix: "%",
    label: "Growth Mindset",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 20V10M9 20V4M15 20v-8M21 20V8" />
      </svg>
    ),
  },
];

// Ordered deliberately: this is the actual sequence a student/partner
// moves through — industry gets linked in, leadership scales the program,
// and that produces talent mobility. The connecting thread below is a
// literal picture of that pipeline, not decoration.
const PILLARS = [
  {
    tag: "01",
    title: "Industry Linkages",
    desc: "Connecting academic institutions with tier-1 corporate partners for applied learning frameworks.",
  },
  {
    tag: "02",
    title: "Executive Leadership",
    desc: "Scaling nationwide operational outreach and structured capacity development programs.",
  },
  {
    tag: "03",
    title: "Talent Mobility",
    desc: "Preparing next-gen students with direct industry-ready competencies and career pipelines.",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AboutSection() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [activePillar, setActivePillar] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const started = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          if (!started.current) {
            started.current = true;

            if (reducedMotion) {
              setCounts(STATS.map((s) => s.target));
              return;
            }

            const duration = 1400;
            const start = performance.now();

            const tick = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutExpo(progress);

              setCounts(
                STATS.map((s) =>
                  progress >= 1 ? s.target : Math.floor(s.target * eased)
                )
              );

              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "50px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Left Text & Stats */}
          <div className="about-copy reveal">
            <span className="eyebrow-label">About</span>
            <h2 className="section-title serif">My Journey</h2>
            <p>
              I am the Business Head at IREED India, where I focus on business development, strategic partnerships and program growth. I work closely with industry and education leaders to design and execute initiatives that create real opportunities for students and professionals.
            </p>
            <a href="#experience" className="link-arrow">
              Read More
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <div className="stat-grid" style={{ marginTop: 34 }}>
              {STATS.map((stat, i) => (
                <div
                  className="stat-card"
                  key={stat.label}
                  data-count={stat.target}
                  data-suffix={stat.suffix}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-num" data-count={stat.target} data-suffix={stat.suffix}>
                    {counts[i]}
                    {stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
              transition: "all 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity",
              paddingTop: "87px",
            }}
          >
            <LeadershipCard
              activePillar={activePillar}
              setActivePillar={setActivePillar}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({ activePillar, setActivePillar, reducedMotion }) {
  const uid = useId();
  const wrapRef = useRef(null);
  const anchorRefs = useRef([]);
  const [tops, setTops] = useState([]);

  const measure = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapTop = wrap.getBoundingClientRect().top;
    const next = anchorRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.top - wrapTop + r.height / 2;
    });
    setTops(next);
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePillar]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    anchorRefs.current.forEach((el) => el && ro.observe(el));
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 50); // fonts settling
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const gutterX = 15; // px, center of the dot column
  const dotR = 5;
  const top0 = tops[0] ?? 0;
  const topActive = tops[activePillar] ?? top0;
  const topLast = tops[tops.length - 1] ?? top0;
  const ready = tops.length === PILLARS.length;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #FBF8F2 0%, #EFE9DC 100%)",
        border: "1px solid rgba(185, 163, 121, 0.4)",
        borderRadius: "24px",
        padding: "36px 32px",
        boxShadow: "0 20px 45px rgba(28, 25, 18, 0.07)",
        position: "relative",
      }}
    >
      {/* Header Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8C7B5D", fontWeight: 600 }}>
            CORE FOCUS
          </span>
          <h3 style={{ fontSize: "1.45rem", fontFamily: "Fraunces, serif", color: "#1C1912", margin: "4px 0 0" }}>
            Leadership Pillars
          </h3>
        </div>
        <div style={{ background: "#1C1912", color: "#F7F4EE", width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>
          IREED
        </div>
      </div>

      {/* Pipeline: gutter thread + pillar rows */}
      <div
        ref={wrapRef}
        style={{ display: "grid", gridTemplateColumns: "30px 1fr", marginBottom: "28px", position: "relative" }}
      >
        {/* Gutter: the connecting thread */}
        <div style={{ position: "relative" }}>
          {ready && (
            <>
              {/* full track, faint */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: gutterX - 1,
                  top: top0,
                  width: 2,
                  height: Math.max(topLast - top0, 0),
                  background: "repeating-linear-gradient(180deg, rgba(154,138,101,0.35) 0 3px, transparent 3px 8px)",
                }}
              />
              {/* traversed portion — solid, animated shimmer */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: gutterX - 1,
                  top: top0,
                  width: 2,
                  height: Math.max(topActive - top0, 0),
                  background: "linear-gradient(180deg, #CBB98D, #9E8255)",
                  backgroundSize: "100% 200%",
                  transition: reducedMotion
                    ? "none"
                    : "height 0.55s cubic-bezier(0.65, 0, 0.35, 1)",
                  animation: reducedMotion ? "none" : `${uid}-shimmer 2.4s linear infinite`,
                  borderRadius: 2,
                }}
              />
              {PILLARS.map((_, i) => {
                const done = i <= activePillar;
                const isActive = i === activePillar;
                return (
                  <div
                    key={i}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: gutterX - dotR,
                      top: (tops[i] ?? 0) - dotR,
                      width: dotR * 2,
                      height: dotR * 2,
                      borderRadius: "50%",
                      background: done ? "#9E8255" : "#FBF8F2",
                      border: done ? "2px solid #9E8255" : "2px solid #C9BFA9",
                      boxShadow: isActive ? "0 0 0 5px rgba(158,130,85,0.16)" : "none",
                      transition: "all 0.4s cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                  />
                );
              })}
            </>
          )}
        </div>

        {/* Pillar rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {PILLARS.map((item, idx) => (
            <div
              key={item.tag}
              onClick={() => setActivePillar(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActivePillar(idx);
              }}
              style={{
                padding: "12px 14px",
                borderRadius: "14px",
                background: activePillar === idx ? "#FFFFFF" : "transparent",
                border: activePillar === idx ? "1px solid #CBB98D" : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: activePillar === idx ? "0 8px 20px rgba(28, 25, 18, 0.06)" : "none",
                outline: "none",
              }}
            >
              <div
                ref={(el) => (anchorRefs.current[idx] = el)}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: activePillar === idx ? "#9E8255" : "#A69F94" }}>
                  {item.tag}
                </span>
                <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1C1912", margin: 0 }}>
                  {item.title}
                </h4>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: activePillar === idx ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p style={{ margin: "8px 0 0 26px", fontSize: "13px", color: "#61594D", lineHeight: 1.5, minWidth: "600px" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Quote Strip */}
      <div
        style={{
          borderTop: "1px solid rgba(185, 163, 121, 0.3)",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#E5DAC5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2519" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: "12.5px", color: "#4E4639", lineHeight: 1.45, fontStyle: "italic" }}>
          "Transforming institutional potential into market-ready career capital."
        </p>
      </div>

      <style>{`
        @keyframes ${uid}-shimmer {
          0% { background-position: 0 100%; }
          100% { background-position: 0 -100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}