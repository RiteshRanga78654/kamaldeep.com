import Image from "next/image";

const items = [
  {
    title: "Session 1:1",
    text: "A focused hour to work through whatever is blocking your next post or launch.",
    img: "/blogs/ireed-events/16.png",
    alt: "Laptop and notebook on a desk for a 1:1 session",
  },
  {
    title: "Strategy development",
    text: "A content plan built around your niche, your schedule, and your goals.",
    img: "/blogs/ireed-events/15.png",
    alt: "Planning notebook with flowers and accessories",
  },
];

const itemsRight = [
  {
    title: "Personalized coaching",
    text: "Ongoing guidance that adapts as your audience and platform do.",
    img: "/blogs/ireed-events/10.png",
    alt: "Coach reviewing notes over coffee",
  },
  {
    title: "Engagement enhancement",
    text: "Practical tactics to turn passive followers into an active community.",
    img: "/blogs/ireed-events/17.png",
    alt: "Hands typing on a laptop keyboard",
  },
];

function Card({ title, text, img, alt }) {
  return (
    <div className="min-w-0">
      <div className="relative h-56 w-full overflow-hidden sm:h-64">
        <Image
          src={img}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3
        className="h3-display mt-4 w-full xl:w-[650px]"
        style={{
          fontFamily: "Cormorant Infant, serif",
          // 52px on large desktops (same as original), scales down below
          fontSize: "clamp(1.75rem, 3.2vw + 1rem, 52px)",
          letterSpacing: "-0.02em", // = -1.04px at 52px
          fontWeight: "400",
        }}
      >
        {title}
      </h3>
      <p
        className="small-text mt-2 max-w-xs"
        style={{
          fontFamily: "Work Sans, sans-serif",
          fontSize: "16px",
          lineHeight: "24px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20">
      <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-12">
          <div>
            <h2 className="h2-display">
              Level up your <em className="italic">content</em> creation game
            </h2>
            <p className="body-text mt-4 max-w-sm">
              Four ways to work together, from a single focused session to an
              ongoing coaching relationship.
            </p>
          </div>
          {items.map((it) => (
            <Card key={it.title} {...it} />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-12 md:mt-24">
          {itemsRight.map((it) => (
            <Card key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}