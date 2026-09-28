"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

const rows = [
  {
    title: "Expertise and Industry Experience",
    text: "Decades of combined commercial real estate wisdom distilled into actionable corporate playbooks and strategic roadmaps.",
  },
  {
    title: "Personalized Executive Mentorship",
    text: "High-touch 1-on-1 advisory structured around your specific portfolio, career milestones, and enterprise scale.",
  },
  {
    title: "Strategic Asset & Market Insights",
    text: "Decisions grounded in verified property trends, regulatory dynamics, and real-world capital intelligence.",
  },
  {
    title: "Supportive Leadership Network",
    text: "Direct access to IREED's elite alumni, institutional partners, and fellow senior executives across the country.",
  },
  {
    title: "End-to-End Deal Acceleration",
    text: "Hands-on guidance on structuring transactions, project monetization, and scaling sustainable development ventures.",
  },
];

export default function JourneyFeatures() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#FAF7F2] py-16 sm:py-32">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-12">
            {/* TEXT: comes second on mobile, left column on desktop */}
            <div className="min-w-0 lg:col-span-6 lg:pr-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="font-serif text-[1.75rem] font-normal leading-[1.18] tracking-tight text-[#1F1E1D] sm:text-4xl lg:text-[48px]">
                  Elevate Your Real Estate <br className="hidden sm:block" />
                  Leadership{" "}
                  <span className="font-serif italic font-normal">Journey</span>
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#6E6B65] sm:mt-6 sm:text-base">
                  Partnering with Kamaldeep at IREED is a comprehensive
                  leadership roadmap designed to transform ambitious
                  professionals into industry authorities.
                </p>
              </motion.div>

              <div className="mt-10 divide-y divide-[#E6DFD3] border-y border-[#E6DFD3] sm:mt-12">
                {rows.map((r, idx) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="grid grid-cols-1 gap-2 py-5 transition-colors duration-300 hover:bg-[#F5EFE6]/40 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-6 lg:grid-cols-[220px_1fr]"
                  >
                    <h3 className="font-serif text-lg font-normal leading-snug text-[#1F1E1D] sm:text-xl">
                      {r.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#6E6B65]">
                      {r.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* IMAGES: on top for mobile (order-first), right column on desktop (lg:order-none) */}
            <div className="relative order-first mx-auto w-full max-w-[560px] lg:order-none lg:col-span-6 lg:mx-0 lg:max-w-none">
              <div className="relative min-h-[500px] sm:min-h-[660px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-6 top-8 h-[240px] w-[140px] bg-[#E3DBD0] sm:left-14 sm:top-10 sm:h-[280px] sm:w-[170px]"
                />

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="group absolute right-0 top-0 z-20 h-[440px] w-[68%] overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-1 sm:top-[-56px] sm:h-[480px] lg:h-[500px]"
                >
                  <Image
                    src="/blogs/ireed-events/19.png"
                    alt="Real Estate Leader working on laptop"
                    fill
                    priority
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 380px, 68vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="group absolute bottom-4 left-0 z-30 h-[200px] w-[50%] overflow-hidden border-4 border-[#FAF7F2] bg-[#FAF7F2] shadow-md transition-transform duration-500 hover:-translate-y-1 sm:bottom-6 sm:h-[270px] sm:w-[52%]"
                >
                  <Image
                    src="/blogs/ireed-events/18.png"
                    alt="Curated workspace setup"
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 290px, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-4 right-0 z-10 h-[100px] w-[180px] bg-[#E3DBD0] sm:bottom-0 sm:h-[130px] sm:w-[220px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}