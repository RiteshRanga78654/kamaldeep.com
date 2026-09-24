const ITEMS = [
  "Business Strategy",
  "Real Estate",
  "Leadership",
  "Growth",
  "Business Development",
  "Market Expansion",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y hairline bg-pista-700 py-4 text-sand-100">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg italic">
            {item}
            <span aria-hidden="true" className="text-sand-100/40">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
