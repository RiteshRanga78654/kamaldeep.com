"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

const courses = [
  {
    title: "Real Estate Business Leadership & Deal Structuring",
    img: "/profile/kamal01/1.jpeg",
    offsetClass: "lg:translate-y-0",
  },
  {
    title: "Commercial Asset Acquisition & Investment Strategy",
    img: "/profile/kamal01/2.jpeg",
    offsetClass: "lg:translate-y-12",
  },
  {
    title: "Advanced Land Development & Project Monetization",
    img: "/blogs/ireed-events/15.png",
    offsetClass: "lg:translate-y-0",
  },
  {
    title: "Institutional Real Estate Partnerships & Capital Growth",
    img: "/blogs/ireed-events/05.png",
    offsetClass: "lg:translate-y-12",
  },
];

export default function CoursesGrid() {
  return (
    // Respects the visitor's "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#FAF7F2] py-16 sm:py-32">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-[1.75rem] font-normal leading-[1.2] tracking-tight text-[#1F1E1D] sm:text-4xl lg:text-[46px]">
              IREED Executive Academy <br />
              Unlock Real Estate Leadership
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-[#75726B] sm:mt-6 sm:text-base">
              Executive learning and strategic masterclasses designed by
              Kamaldeep at IREED <br className="hidden sm:inline" />
              for professionals aiming to lead and scale high-value property
              ventures.
            </p>
          </motion.div>

          {/*
            Mobile: swipeable row with the next card peeking in.
            sm and up: normal grid (2 columns, then 4 on lg), same as the original.
          */}
          <div
            className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-20 lg:grid-cols-4 lg:gap-6"
          >
            {courses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                // bottom-only margin, so the peeking next card on mobile still animates in
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`group flex w-[72%] max-w-[300px] shrink-0 snap-start flex-col sm:w-auto sm:max-w-none ${course.offsetClass}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE3D6] shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                  <Image
                    src={course.img}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 72vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>

                <h3 className="mt-4 font-serif text-lg font-normal leading-[1.3] text-[#1F1E1D] transition-colors duration-300 group-hover:text-[#59644D] sm:mt-5 sm:text-xl">
                  {course.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}