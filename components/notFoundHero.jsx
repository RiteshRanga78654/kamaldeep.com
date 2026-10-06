"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---------- pages ka design (deterministic, SSR safe) ---------- */

const PAGES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  is404: i === 0,
  w: i === 0 ? 124 : 70 + ((i * 23) % 44),
  h: i === 0 ? 160 : 92 + ((i * 31) % 50),
  mark: i === 0 ? "404" : i % 4 === 0 ? "?" : i % 5 === 0 ? "✕" : null,
}));

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function Paper({ p }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3px] border border-ink/10 bg-[#fbf7ec] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]">
      {!p.is404 && (
        <div
          className="absolute inset-x-3 bottom-3 top-5 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(107,122,58,.35) 0 2px, transparent 2px 9px)",
          }}
        />
      )}

      {p.is404 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-cormorant text-[48px] font-semibold leading-none text-olive-dark">
            404
          </span>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">
            Page not found
          </span>
        </div>
      ) : (
        p.mark && (
          <span className="absolute inset-0 flex items-center justify-center font-cormorant text-[40px] text-[#c9a45c]/70">
            {p.mark}
          </span>
        )
      )}

      {/* mudda hua kona */}
      <span className="absolute right-0 top-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-transparent border-t-black/10" />
    </div>
  );
}

/* ---------- udte hue pages (physics) ---------- */

function LostPages({ onCatch }) {
  const wrapRef = useRef(null);
  const els = useRef([]);
  const ps = useRef([]);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const caughtSet = useRef(new Set());

  const toLocal = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e, i) => {
    const p = ps.current[i];
    if (!p) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const m = toLocal(e);
    p.drag = true;
    p.ox = p.x - m.x;
    p.oy = p.y - m.y;
    p.vx = 0;
    p.vy = 0;
    p.vr = 0;
    els.current[i].style.zIndex = 5;
    if (!caughtSet.current.has(i)) {
      caughtSet.current.add(i);
      onCatch(caughtSet.current.size, PAGES[i].is404);
    } else if (PAGES[i].is404) {
      onCatch(caughtSet.current.size, true);
    }
  };

  const onMove = (e, i) => {
    const p = ps.current[i];
    if (!p || !p.drag) return;
    const m = toLocal(e);
    const nx = m.x + p.ox;
    const ny = m.y + p.oy;
    p.vx = clamp(p.vx * 0.4 + (nx - p.x) * 0.6, -14, 14);
    p.vy = clamp(p.vy * 0.4 + (ny - p.y) * 0.6, -14, 14);
    p.r += p.vx * 0.3; // hilte hue thoda jhukta hai
    p.x = nx;
    p.y = ny;
  };

  const onUp = (i) => {
    const p = ps.current[i];
    if (!p) return;
    p.drag = false;
    p.calm = 90; // chhodne ke baad kuch der bhaagta nahi
    p.vr = p.vx * 0.15;
    els.current[i].style.zIndex = 1;
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    let W = wrap.clientWidth;
    let H = wrap.clientHeight;
    const small = window.innerWidth < 640;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visible = small ? 9 : PAGES.length;
    onCatch(0, false, visible);

    ps.current = PAGES.map((pg) => ({
      x: rand(60, Math.max(80, W - 60)),
      y: rand(60, Math.max(80, H - 60)),
      vx: reduce ? 0 : rand(-0.5, 0.5),
      vy: reduce ? 0 : rand(-0.4, 0.4),
      r: rand(-35, 35),
      vr: reduce ? 0 : rand(-0.2, 0.2),
      w: pg.w,
      h: pg.h,
      t: rand(0, 10),
      drag: false,
      calm: 0,
      ox: 0,
      oy: 0,
    }));

    els.current.forEach((el, i) => {
      if (!el) return;
      if (i >= visible) el.style.display = "none";
      else el.style.opacity = "1";
    });

    const onMouse = (e) => {
      if (e.pointerType === "touch") return;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.active = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    };
    const onLeave = () => (mouse.current.active = false);
    const onResize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
    };

    window.addEventListener("pointermove", onMouse);
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const RADIUS = 170;
    let raf;
    const tick = () => {
      ps.current.forEach((p, i) => {
        const el = els.current[i];
        if (!el || i >= visible) return;

        if (!p.drag) {
          if (!reduce) {
            p.t += 0.016;
            // halka sa bhatakna
            p.vx += Math.sin(p.t * 0.9 + i) * 0.004;
            p.vy += Math.cos(p.t * 0.7 + i * 1.7) * 0.004;

            // mouse se door bhaagna
            if (p.calm > 0) p.calm--;
            else if (mouse.current.active) {
              const dx = p.x - mouse.current.x;
              const dy = p.y - mouse.current.y;
              const d = Math.hypot(dx, dy);
              if (d < RADIUS && d > 0.001) {
                const f = (1 - d / RADIUS) * 1.2;
                p.vx += (dx / d) * f;
                p.vy += (dy / d) * f;
                p.vr += (dx / d) * f * 0.4;
              }
            }
          }

          p.vx *= 0.985;
          p.vy *= 0.985;
          p.vr *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.vr;

          // kinaron se takrakar wapas
          const hx = p.w / 2;
          const hy = p.h / 2;
          if (p.x < hx) { p.x = hx; p.vx = Math.abs(p.vx); }
          if (p.x > W - hx) { p.x = W - hx; p.vx = -Math.abs(p.vx); }
          if (p.y < hy) { p.y = hy; p.vy = Math.abs(p.vy); }
          if (p.y > H - hy) { p.y = H - hy; p.vy = -Math.abs(p.vy); }
        }

        el.style.transform = `translate3d(${p.x - p.w / 2}px, ${p.y - p.h / 2}px, 0) rotate(${p.r}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMouse);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {PAGES.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => (els.current[i] = el)}
          onPointerDown={(e) => onDown(e, i)}
          onPointerMove={(e) => onMove(e, i)}
          onPointerUp={() => onUp(i)}
          onPointerCancel={() => onUp(i)}
          className="absolute left-0 top-0 cursor-grab touch-none select-none opacity-0 transition-opacity duration-700 will-change-transform active:cursor-grabbing"
          style={{ width: p.w, height: p.h, zIndex: 1 }}
        >
          <Paper p={p} />
        </div>
      ))}
    </div>
  );
}

/* ---------- page content ---------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function NotFoundHero() {
  const [caught, setCaught] = useState(0);
  const [total, setTotal] = useState(PAGES.length);
  const [got404, setGot404] = useState(false);

  const handleCatch = (count, is404, visible) => {
    if (visible) setTotal(visible);
    setCaught(count);
    if (is404) setGot404(true);
  };

  return (
    <main className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-24">
      {/* udte hue kho gaye pages */}
      <LostPages onCatch={handleCatch} />

      {/* center content (pointer-events-none taaki pages pakde ja sakein) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x pointer-events-none relative z-10 text-center"
      >
        <motion.p
          variants={item}
          className="mx-auto min-h-[1.5em] max-w-[40ch] text-[12px] font-semibold uppercase tracking-[0.16em] text-olive-dark"
        >
          {got404
            ? "Pakad liya! Par ye page yahan ka nahi, Home chalo"
            : "Kho gaye pages ko pakad ke dekho, wo bhaagte hain"}
        </motion.p>

        <motion.h2
          variants={item}
          aria-hidden
          className="select-none font-cormorant text-[28vw] font-semibold leading-[0.9] sm:text-[18vw] lg:text-[200px]"
          style={{
            background: "linear-gradient(180deg, #6b7a3a 0%, #c9a45c 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </motion.h2>

        <motion.h1
          variants={item}
          className="mt-2 font-cormorant text-[30px] leading-[1.12] text-ink sm:text-[40px] lg:text-[48px]"
        >
          This page has moved on
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-[1.75]">
          The link you followed is broken, or the article has been renamed.
          The blog and project archives are both a click away.
        </motion.p>

        <motion.div
          variants={item}
          className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="btn">Back to Home</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/blogs" className="btn-outline">Browse the Blog</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/projects" className="btn-outline">View Projects</Link>
          </motion.div>
        </motion.div>

        <motion.p variants={item} className="mt-6 text-[12px] opacity-60">
          Pakde gaye pages: {caught} / {total}
        </motion.p>
      </motion.div>
    </main>
  );
}