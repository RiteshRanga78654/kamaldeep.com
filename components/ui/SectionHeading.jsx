import Reveal from "@/components/ui/Reveal";

export function SectionHeading({ eyebrow, title, index, description, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 text-xs tracking-widest2 text-pista-600 font-medium mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {index && <span className="text-bronze/80">{index}</span>}
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-[2.1rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem] text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-ink-soft text-[1.02rem] leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
