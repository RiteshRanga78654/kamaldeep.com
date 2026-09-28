import Image from "next/image";

const points = [
  {
    title: "Data-driven insights",
    text: "Decisions grounded in what your audience actually does, not guesswork.",
  },
  {
    title: "Continuous support",
    text: "Regular check-ins between sessions so nothing stalls for a month.",
  },
];

export default function JourneySplit() {
  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-content grid-cols-1 md:grid-cols-2">
        <div className="flex min-w-0 flex-col justify-center px-6 py-16 md:px-14 md:py-20">
          <h2
            className="h2-display w-full xl:w-[650px]"
            style={{
              fontFamily: "Cormorant Infant, serif",
              // 52px on large desktops (same as original), scales down below
              fontSize: "clamp(1.75rem, 3.2vw + 1rem, 52px)",
              letterSpacing: "-0.02em", // = -1.04px at 52px
              fontWeight: "400",
            }}
          >
            A Personalized Pathway to <em className="italic">Mastering</em> Real
            Estate Leadership
          </h2>
          <p
            className="body-text mt-5 max-w-md"
            style={{
              fontFamily: "Work Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            No two professionals or enterprises scale the same way. We begin
            with a comprehensive career and business evaluation, then craft a
            strategic roadmap aligned with your market goals and sector
            ambitions.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title}>
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-ink"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  aria-hidden="true"
                >
                  <circle cx="8" cy="12" r="5" />
                  <circle cx="16" cy="12" r="5" />
                </svg>
                <h3 className="h3-display mt-4">{p.title}</h3>
                <p className="small-text mt-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative flex min-h-[360px] items-center justify-center p-6 sm:p-10"
          style={{
            backgroundColor: "#EFE7DA",
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(180,140,120,0.25) 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, rgba(90,90,90,0.18) 0 5px, transparent 6px), radial-gradient(circle at 40% 80%, rgba(180,140,120,0.2) 0 4px, transparent 5px), radial-gradient(circle at 85% 20%, rgba(90,90,90,0.15) 0 4px, transparent 5px)",
            backgroundSize: "140px 140px",
          }}
        >
          {/* 600 x 350 on desktop (original); keeps its proportions on smaller screens */}
          <div className="relative aspect-[600/350] w-full max-w-[600px] overflow-hidden shadow-lg lg:aspect-auto lg:h-[350px]">
            <Image
              src="/profile/kamal01/TKS05223.JPG"
              alt="Kamaldeep laughing outdoors in a yellow blazer"
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}