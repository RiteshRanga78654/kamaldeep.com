export default function IntroBanner() {
  return (
    <section className="py-14">
      <div className="container-x flex flex-col items-center text-center">
        {/* Mobile only: single sparkle above the heading */}
        <Sparkle className="mb-4 h-7 w-7 text-gold md:hidden" />

        <div className="flex items-center gap-6 text-gold">
          <Sparkle className="hidden h-8 w-10 shrink-0 md:block" />
          <h2
            className="h2-display max-w-[740px] !leading-[1.1] md:!leading-none"
            style={{
              fontFamily: "Cormorant Infant, serif",
              // 52px on desktop (same as original), scales down on smaller screens
              fontSize: "clamp(1.75rem, 6vw, 52px)",
              letterSpacing: "-0.02em", // = -1.04px at 52px
              fontWeight: "400",
            }}
          >
            Everyone Has The Potential to Excel in{" "}
            <em className="italic">Real Estate</em> Leadership, With the Right
            Guidance
          </h2>
          <Sparkle className="hidden h-8 w-8 shrink-0 md:block" />
        </div>

        <p
          className="body-text mt-6 max-w-[640px]"
          style={{
            fontFamily: "Work Sans, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          The real estate industry thrives on strategic vision, sharp market
          intelligence, and actionable execution. At IREED, we bridge the gap
          between academic theory and practical commercial success, mentoring
          ambitious professionals and entrepreneurs to build lasting wealth,
          secure institutional partnerships, and lead in a rapidly evolving
          property ecosystem.
        </p>

        <a href="#about" className="eyebrow-link mt-6">
          Learn more
        </a>
      </div>
    </section>
  );
}

function Sparkle({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0l1.8 8.2L22 10l-8.2 1.8L12 20l-1.8-8.2L2 10l8.2-1.8L12 0z" />
    </svg>
  );
}