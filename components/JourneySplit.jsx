"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const points = [
  {
    title: "Data-driven insights",
    text: "Decisions grounded in what your audience actually does, not guesswork.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 transition-colors duration-300 group-hover:text-[#586343]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        <circle cx="8" cy="12" r="5" />
        <circle cx="16" cy="12" r="5" />
      </svg>
    ),
  },
  {
    title: "Continuous support",
    text: "Regular check-ins between sessions so nothing stalls for a month.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 transition-colors duration-300 group-hover:text-[#586343]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

// Animation variants for container & staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function JourneySplit() {
  return (
    <section className="bg-sand overflow-hidden">
      <div className="mx-auto grid max-w-content grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex min-w-0 flex-col justify-center px-6 py-16 md:px-14 md:py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="h2-display w-full xl:w-[650px]"
            style={{
              fontFamily: "Cormorant Infant, serif",
              fontSize: "clamp(1.75rem, 3.2vw + 1rem, 52px)",
              letterSpacing: "-0.02em",
              fontWeight: "400",
            }}
          >
            A Personalized Pathway to <em className="italic">Mastering</em> Real
            Estate Leadership
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
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
          </motion.p>

          {/* Staggered on-scroll Animated Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {points.map((p) => (
              <motion.div
                key={p.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#DDD5C3]/80 bg-[#FAF7F0]/90 p-6 shadow-sm transition-all duration-300 hover:border-[#73805B]/60 hover:bg-[#EDE5D6] hover:shadow-xl hover:shadow-[#1B1713]/8"
              >
                {/* Decorative background hover glow effect */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#73805B]/0 blur-xl transition-all duration-500 group-hover:bg-[#73805B]/15" />

                {/* Icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#DDD5C3] bg-white/80 shadow-xs transition-all duration-300 group-hover:border-[#73805B]/40 group-hover:bg-white group-hover:shadow-md">
                  {p.icon}
                </div>

                <h3
                  className="h3-display mt-5 text-[20px] font-semibold text-[#1B1713] transition-colors duration-300 group-hover:text-[#586343]"
                  style={{ fontFamily: "Cormorant Infant, serif" }}
                >
                  {p.title}
                </h3>

                <p
                  className="small-text mt-2 text-[14px] leading-relaxed text-[#5A5348] transition-colors duration-300 group-hover:text-[#2E2820]"
                  style={{ fontFamily: "Work Sans, sans-serif" }}
                >
                  {p.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column (Image with background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex min-h-[360px] items-center justify-center p-6 sm:p-10"
          style={{
            backgroundColor: "#EFE7DA",
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(180,140,120,0.25) 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, rgba(90,90,90,0.18) 0 5px, transparent 6px), radial-gradient(circle at 40% 80%, rgba(180,140,120,0.2) 0 4px, transparent 5px), radial-gradient(circle at 85% 20%, rgba(90,90,90,0.15) 0 4px, transparent 5px)",
            backgroundSize: "140px 140px",
          }}
        >
          <div className="relative aspect-[600/350] w-full max-w-[600px] overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:scale-[1.01] lg:aspect-auto lg:h-[350px]">
            <Image
              src="/profile/kamal01/TKS05223.JPG"
              alt="Kamaldeep laughing outdoors in a yellow blazer"
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}