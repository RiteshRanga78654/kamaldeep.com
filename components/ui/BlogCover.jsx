const PALETTES = {
  "Real Estate": ["#5D7147", "#93AE77"],
  Leadership: ["#465536", "#AEC495"],
  Business: ["#788F5C", "#E2E9D6"],
  "Market Insights": ["#333E28", "#C9D6B6"],
  Strategy: ["#5D7147", "#F1F4EC"],
};

export function BlogCover({ category, title, className = "" }) {
  const [from, to] = PALETTES[category] || PALETTES["Business"];
  const gradId = `grad-${category.replace(/\s+/g, "-")}`;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill={`url(#${gradId})`} />
        <g opacity="0.25" stroke="#F5F0E4" strokeWidth="0.6">
          <path d="M0 210 H400" />
          <path d="M0 170 H260" />
          <path d="M60 260 V150 H140 V260" />
          <path d="M220 260 V110 H300 V260" />
          <path d="M320 260 V180 H380 V260" />
        </g>
      </svg>
      <span className="absolute bottom-3 left-4 font-display text-xs italic text-sand-50/80">
        {category}
      </span>
    </div>
  );
}
