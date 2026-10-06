"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/* ============================================================
   Area chart — animated line + gradient fill
   ============================================================ */

export function AreaChart({ data, labels, height = 200, stroke = "#5C6647" }) {
  const uid = useId().replace(/:/g, "");
  const W = 720;
  const H = height;
  const P = 16;

  const max = Math.max(...data);
  const min = Math.min(...data) * 0.86;
  const span = max - min || 1;

  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    P + (1 - (v - min) / span) * (H - P * 2),
  ]);

  const line = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, "");

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: H, width: "100%" }} role="img" aria-label="Sessions trend">
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.24" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.2, 0.5, 0.8].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={P + f * (H - P * 2)}
            y2={P + f * (H - P * 2)}
            stroke="rgba(43,41,36,0.07)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <motion.path
          d={`${line} L ${W} ${H} L 0 ${H} Z`}
          fill={`url(#g-${uid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, "cubic-bezier": [0.22, 1, 0.36, 1] }}
        />

        {pts.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2.8"
            fill="#fffdf9"
            stroke={stroke}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + i * 0.05, duration: 0.3 }}
          />
        ))}
      </svg>

      <div className="mt-2.5 flex justify-between">
        {labels.map((l) => (
          <span key={l} className="text-[10px] font-medium tracking-wide text-muted">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Bars — animated vertical bars
   ============================================================ */

export function BarChart({ data, height = 190 }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-2.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
          <span className="text-[10.5px] font-semibold text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {d.value}
          </span>
          <motion.div
            className="w-full rounded-t-lg"
            style={{ background: d.color ?? "#5C6647" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(d.value / max) * 100}%`, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1 + i * 0.07, "cubic-bezier": [0.22, 1, 0.36, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

export function BarLabels({ labels }) {
  return (
    <div className="mt-2.5 flex justify-between">
      {labels.map((l) => (
        <span key={l} className="text-[10px] font-medium tracking-wide text-muted">
          {l}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   Donut
   ============================================================ */

export function Donut({ segments, size = 150, thickness = 15 }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;

  const arcs = segments.reduce(
    (acc, s) => {
      const len = (s.value / total) * circ;
      acc.items.push({ ...s, len, start: acc.cursor });
      acc.cursor += len;
      return acc;
    },
    { cursor: 0, items: [] },
  );

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-7">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} role="img" aria-label="Traffic sources">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(43,41,36,0.07)" strokeWidth={thickness} />
          {arcs.items.map((s, i) => (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${s.len} ${circ - s.len}`}
              initial={{ strokeDashoffset: -circ }}
              animate={{ strokeDashoffset: -s.start }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.11, "cubic-bezier": [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="a-display text-[22px] leading-none text-ink">{total}%</span>
          <span className="a-label mt-1 !text-[9px]">Traffic</span>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {arcs.items.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden="true" />
            <span className="flex-1 truncate text-[13px] text-ink">{s.label}</span>
            <span className="text-[12.5px] font-medium text-muted">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   Sparkline (stat cards)
   ============================================================ */

export function Spark({ data, color = "#5C6647", width = 76, height = 26 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * width, height - ((v - min) / span) * height]);
  const d = pts.reduce((acc, [x, y], i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`), "");

  return (
    <svg width={width} height={height} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.35, "cubic-bezier": [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.6"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.05, duration: 0.3 }}
      />
    </svg>
  );
}

/* ============================================================
   Progress list
   ============================================================ */

export function Progress({ items }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="space-y-3.5">
      {items.map((it, i) => (
        <li key={it.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="truncate text-[13px] text-ink">{it.label}</span>
            <span className="shrink-0 text-[12px] font-medium text-muted">{it.value}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-sand/50">
            <motion.div
              className="h-full rounded-full"
              style={{ background: it.color ?? "#5C6647" }}
              initial={{ width: 0 }}
              animate={{ width: `${(it.value / max) * 100}%` }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.08, "cubic-bezier": [0.22, 1, 0.36, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ============================================================
   Radial gauge
   ============================================================ */

export function Gauge({ value, label, color = "#5C6647", size = 108 }) {
  const th = 9;
  const r = (size - th) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} role="img" aria-label={`${label}: ${value}%`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(43,41,36,0.07)" strokeWidth={th} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={th}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
            transition={{ duration: 1.1, delay: 0.15, "cubic-bezier": [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="a-display text-[22px] leading-none text-ink">{pct}%</span>
        </div>
      </div>
      <span className="a-label !text-[9px]">{label}</span>
    </div>
  );
}
