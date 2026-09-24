export function SkylineMotif({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 900 220"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        <path d="M0 220 V120 H40 V150 H70 V120 H100 V220" />
        <path d="M120 220 V70 H160 V220" />
        <path d="M160 220 V70 L180 40 L200 70 V220" />
        <path d="M220 220 V100 H280 V220" />
        <path d="M300 220 V150 H320 V130 H360 V150 H380 V220" />
        <path d="M400 220 V50 H430 V220" />
        <path d="M450 220 V90 H520 V220" />
        <path d="M540 220 V140 H560 V220" />
        <path d="M580 220 V60 H600 V40 H640 V60 H660 V220" />
        <path d="M680 220 V110 H740 V220" />
        <path d="M760 220 V150 H800 V180 H840 V150 H900 V220" />
      </g>
    </svg>
  );
}

export function OfficeMotif({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className={className}>
      <defs>
        <linearGradient id="office-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1E9D8" />
          <stop offset="100%" stopColor="#C9BB9C" />
        </linearGradient>
      </defs>
      <rect width="1200" height="560" fill="url(#office-grad)" />
      <g fill="none" stroke="rgba(28,25,18,.16)" strokeWidth="1.2">
        <rect x="720" y="40" width="420" height="520" />
        {[80, 190, 300].map((y) =>
          [760, 840, 920, 1000].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="60" height="90" />
          ))
        )}
      </g>
      <text x="930" y="300" fontFamily="Fraunces, serif" fontSize="17" fill="rgba(28,25,18,.38)" textAnchor="middle">
        IREED
      </text>
      <g fill="rgba(139,122,84,.3)">
        <ellipse cx="1080" cy="480" rx="60" ry="90" />
        <ellipse cx="1140" cy="500" rx="45" ry="65" />
      </g>
    </svg>
  );
}

export function BlueprintGrid({ className = "" }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 200 200" preserveAspectRatio="none">
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#bp-grid)" />
    </svg>
  );
}