"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const itemsLeft = [
  {
    index: "01",
    title: "Session 1:1",
    tag: "High Impact",
    text: "A focused hour to work through whatever is blocking your next post, launch, or campaign.",
    img: "/blogs/ireed-events/16.png",
    alt: "Laptop and notebook on a desk for a 1:1 session",
  },
  {
    index: "02",
    title: "Strategy development",
    tag: "Roadmap",
    text: "A tailored content plan built around your distinct niche, schedule, and revenue goals.",
    img: "/blogs/ireed-events/15.png",
    alt: "Planning notebook with flowers and accessories",
  },
];

const itemsRight = [
  {
    index: "03",
    title: "Personalized coaching",
    tag: "Mentorship",
    text: "Ongoing strategic guidance that continuously adapts as your audience and platforms expand.",
    img: "/blogs/ireed-events/10.png",
    alt: "Coach reviewing notes over coffee",
  },
  {
    index: "04",
    title: "Engagement enhancement",
    tag: "Community",
    text: "Proven, actionable tactics to convert casual, passive followers into an active community.",
    img: "/blogs/ireed-events/17.png",
    alt: "Hands typing on a laptop keyboard",
  },
];

const ArrowUpRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

function ServiceCard({ title, text, img, alt, index, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
    >
      {/* Visual Frame */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[#DDD5C3]/80 bg-[#EFEADB] shadow-sm transition-all duration-500 group-hover:border-[#73805B]/50 group-hover:shadow-xl group-hover:shadow-[#1B1713]/8">
        <Image
          src={img}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 540px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Darkened Gradient for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1713]/40 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        {/* Glass Floating Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1B1713] shadow-sm backdrop-blur-md">
            {index}
          </span>
          <span className="rounded-full border border-white/20 bg-[#1B1713]/60 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
            {tag}
          </span>
        </div>
      </div>

      {/* Content Meta */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-[26px] font-medium leading-snug text-[#1B1713] transition-colors duration-300 group-hover:text-[#586343] sm:text-[30px]"
            style={{ fontFamily: "Cormorant Infant, serif" }}
          >
            {title}
          </h3>
          <p
            className="mt-2 text-[14.5px] leading-relaxed text-[#5A5348]"
            style={{ fontFamily: "Work Sans, sans-serif" }}
          >
            {text}
          </p>
        </div>

        {/* Floating Circular Arrow Action */}
        <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#DDD5C3] bg-white text-[#1B1713] shadow-xs transition-all duration-300 group-hover:border-[#73805B] group-hover:bg-[#586343] group-hover:text-white group-hover:shadow-md">
          <ArrowUpRight />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="overflow-hidden bg-[#FAF8F5] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
          
          {/* Left Column (Header + 2 Cards) */}
          <div className="flex flex-col gap-14 sm:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD5C3] bg-[#EFEADB]/70 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#586343]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#73805B]" />
                Offerings & Frameworks
              </div>

              <h2
                className="mt-5 text-[34px] font-normal leading-[1.12] text-[#1B1713] sm:text-[44px] lg:text-[50px]"
                style={{
                  fontFamily: "Cormorant Infant, serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Level up your <em className="italic text-[#586343]">content</em>{" "}
                creation game
              </h2>

              <p
                className="mt-4 max-w-md text-[15.5px] leading-relaxed text-[#5A5348]"
                style={{ fontFamily: "Work Sans, sans-serif" }}
              >
                Four intentional ways to collaborate — from an intensive, single-hour
                breakthrough session to a multi-quarter leadership partnership.
              </p>
            </motion.div>

            {itemsLeft.map((it) => (
              <ServiceCard key={it.title} {...it} />
            ))}
          </div>

          {/* Right Column (Staggered offset cards) */}
          <div className="flex flex-col gap-14 pt-0 sm:gap-16 md:pt-36">
            {itemsRight.map((it) => (
              <ServiceCard key={it.title} {...it} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}