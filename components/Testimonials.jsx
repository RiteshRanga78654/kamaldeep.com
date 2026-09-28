"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Kamaldeep prajapati, guided me through the process with patience and understanding. She helped me identify my strengths, hone my niche, and connect with my target audience authentically. Thanks to her, I now feel more confident and purposeful in my content.",
    name: "Emma Watson",
    role: "Aspiring Influencer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&fit=crop",
  },
  {
    quote:
      "The 1:1 sessions gave me a clear, actionable plan. Within just two months my strategy felt intentional instead of reactive, and that directly reflected in our audience growth and engagement.",
    name: "Sarah Mich",
    role: "Lifestyle Blogger",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80&fit=crop",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const touchX = useRef(null);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  // Swipe left / right on mobile
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <section className="relative overflow-hidden bg-[#ECE6DA] py-14 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-8">
            <h2 className="font-serif text-[1.75rem] font-normal leading-[1.2] tracking-tight text-[#1F1E1D] sm:text-5xl lg:text-[54px]">
              What Our Clients Have to Say <br className="hidden lg:block" />
              About Their <span className="italic font-serif">Experience</span>{" "}
              With Kamaldeep prajapati
            </h2>

            {/* Swipeable area. All quotes share one grid cell, so the height never jumps between slides */}
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="mt-6 grid max-w-2xl touch-pan-y sm:mt-8"
            >
              {testimonials.map((t, i) => (
                <p
                  key={t.name}
                  aria-hidden={i !== index}
                  className={`col-start-1 row-start-1 text-[15px] leading-[1.75] text-[#4A4844] transition-opacity duration-300 sm:text-[17px] sm:leading-[1.8] ${
                    i === index ? "opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {t.quote}
                </p>
              ))}
            </div>

            {/* Author + (mobile) arrows on the same row */}
            <div className="mt-7 flex items-center justify-between gap-4 sm:mt-10 lg:justify-start">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#D5CDC0] shadow-sm">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-base font-medium text-[#1F1E1D] sm:text-lg">
                    {current.name}
                  </p>
                  <p className="text-xs font-normal text-[#75726B]">
                    {current.role}
                  </p>
                </div>
              </div>

              <div className="lg:hidden">
                <Arrows onPrev={prev} onNext={next} />
              </div>
            </div>

            {/* Mobile dots */}
            <div className="mt-6 flex items-center gap-2 lg:hidden">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-[#8C7A3E]" : "w-1.5 bg-[#CFC6B6]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop only: sparkles + arrows (unchanged from original) */}
          <div className="relative hidden flex-col items-end justify-between lg:col-span-4 lg:flex lg:h-full lg:min-h-[380px]">
            <div className="flex w-full justify-end">
              <SparklesArt />
            </div>
            <Arrows onPrev={prev} onNext={next} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrows({
  onPrev,
  onNext,
}) {
  const btn =
    "-m-3 p-3 text-[#3A3835] transition-transform duration-200 hover:text-[#1F1E1D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C7A3E]";
  return (
    <div className="flex items-center gap-8 sm:gap-10">
      <button
        aria-label="Previous testimonial"
        onClick={onPrev}
        className={`${btn} hover:-translate-x-1`}
      >
        <svg
          width="36"
          height="18"
          viewBox="0 0 36 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="34" y1="9" x2="2" y2="9" />
          <polyline points="9 2 2 9 9 16" />
        </svg>
      </button>
      <button
        aria-label="Next testimonial"
        onClick={onNext}
        className={`${btn} hover:translate-x-1`}
      >
        <svg
          width="36"
          height="18"
          viewBox="0 0 36 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="2" y1="9" x2="34" y2="9" />
          <polyline points="27 2 34 9 27 16" />
        </svg>
      </button>
    </div>
  );
}

function SparklesArt() {
  return (
    <svg
      viewBox="0 0 160 280"
      aria-hidden="true"
      className="h-[280px] w-[140px] text-[#8C7A3E]"
      fill="currentColor"
    >
      <path d="M40 38 L43 48 L53 51 L43 54 L40 64 L37 54 L27 51 L37 48 Z" />
      <line x1="40" y1="34" x2="40" y2="68" stroke="currentColor" strokeWidth="1.2" />
      <line x1="23" y1="51" x2="57" y2="51" stroke="currentColor" strokeWidth="1.2" />

      <circle cx="100" cy="22" r="3" />
      <circle cx="112" cy="46" r="2.2" />
      <circle cx="92" cy="74" r="4.5" />
      <circle cx="110" cy="80" r="3.2" />
      <circle cx="106" cy="120" r="3" />
      <circle cx="100" cy="150" r="3.5" />
      <circle cx="80" cy="208" r="4" />
      <circle cx="90" cy="232" r="3.8" />
      <circle cx="132" cy="132" r="3.5" />

      <path d="M48 90 L51 96 L57 99 L51 102 L48 108 L45 102 L39 99 L45 96 Z" />
      <path
        d="M70 128 L76 136 L70 144 L64 136 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M80 108 L81.5 112 L85.5 113.5 L81.5 115 L80 119 L78.5 115 L74.5 113.5 L78.5 112 Z" />
      <path d="M130 114 L131.5 118 L135.5 119.5 L131.5 121 L130 125 L128.5 121 L124.5 119.5 L128.5 118 Z" />
      <path d="M72 176 L73.5 180 L77.5 181.5 L73.5 183 L72 187 L70.5 183 L66.5 181.5 L70.5 180 Z" />

      <g transform="translate(130, 185)">
        <line x1="-22" y1="0" x2="22" y2="0" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="-22" x2="0" y2="22" stroke="currentColor" strokeWidth="1.2" />
        <line x1="-16" y1="-16" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="-16" y1="16" x2="16" y2="-16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="-8" y1="-20" x2="8" y2="20" stroke="currentColor" strokeWidth="0.8" />
        <line x1="-20" y1="-8" x2="20" y2="8" stroke="currentColor" strokeWidth="0.8" />
        <line x1="-20" y1="8" x2="20" y2="-8" stroke="currentColor" strokeWidth="0.8" />
        <line x1="-8" y1="20" x2="8" y2="-20" stroke="currentColor" strokeWidth="0.8" />
      </g>

      <g transform="translate(108, 218)">
        <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
}