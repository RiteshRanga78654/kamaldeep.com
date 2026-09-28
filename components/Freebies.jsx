"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function Freebies() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setTimeout(() => setStatus("idle"), 4000);
    setEmail("");
  };

  return (
    // Respects the visitor's "reduce motion" setting (stops the floating / tilting)
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-sand py-16 sm:py-32">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-16 lg:grid-cols-12 lg:gap-8">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mx-auto flex h-[300px] w-full max-w-[480px] items-center justify-center min-[400px]:h-[340px] sm:h-[420px] lg:col-span-6 lg:mx-0 lg:h-[460px]"
              style={{ perspective: 1000 }}
            >
              <motion.div
                animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.03, 0.99, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 z-0 text-gold/80"
                aria-hidden="true"
              >
                <div className="absolute left-2 top-4 sm:left-6 sm:top-8">
                  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" stroke="currentColor">
                    <path d="M21 0 L21 42 M0 21 L42 21" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 6 L36 36 M6 36 L36 6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    <circle cx="9" cy="18" r="1.5" fill="currentColor" />
                    <circle cx="28" cy="8" r="1.2" fill="currentColor" />
                  </svg>
                </div>

                <div className="absolute bottom-3 left-4 sm:bottom-6 sm:left-8">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor">
                    <line x1="17" y1="2" x2="17" y2="32" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="17" x2="32" y2="17" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="28" y2="28" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="absolute right-3 top-5 sm:right-8 sm:top-10">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor">
                    <line x1="19" y1="2" x2="19" y2="14" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="30" y1="8" x2="21" y2="17" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="36" y1="19" x2="24" y2="19" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-16">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
                  </svg>
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
              </motion.div>

              {/*
                The two "books" are 382px wide together, wider than a phone screen.
                On mobile the whole pair is scaled down as one unit; sm and up = original size.
              */}
              <div className="relative z-10 flex shrink-0 origin-center items-center justify-center scale-[0.68] min-[400px]:scale-[0.8] sm:scale-100">
                <motion.div
                  style={{ rotateX, rotateY }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="relative z-20 h-[320px] w-[220px] -rotate-6 rounded-[24px] border-[7px] border-ink bg-ink p-1 shadow-2xl transition-all duration-300 sm:h-[350px] sm:w-[245px]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-cream">
                    <Image
                      src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80&fit=crop"
                      alt="Real Estate & Leadership Blueprint"
                      fill
                      sizes="245px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-olive/90 p-4 text-center text-cream backdrop-blur-xs">
                      <p className="font-serif text-xs font-semibold tracking-wider uppercase text-cream/90">
                        Free Executive Guide
                      </p>
                      <p className="mt-0.5 font-serif text-[11px] leading-tight text-cream">
                        Real Estate &amp; Business Leadership
                      </p>
                      <span className="mt-2 block text-[9px] tracking-widest text-cream/70">
                        By Kamaldeep
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  style={{ rotateX, rotateY }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.3 }}
                  className="relative z-10 -ml-12 h-[310px] w-[210px] rotate-[8deg] overflow-hidden rounded-r-md border-l-4 border-ink/20 bg-white shadow-xl transition-transform duration-500 hover:rotate-12 sm:h-[340px] sm:w-[230px]"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&q=80&fit=crop"
                    alt="IREED Strategic Playbook"
                    fill
                    sizes="230px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-olive p-4 text-center text-cream">
                    <p className="font-serif text-[11px] font-semibold tracking-wider uppercase text-cream/90">
                      Strategic Playbook
                    </p>
                    <p className="mt-0.5 text-[10px] text-cream/80">
                      IREED Growth Framework
                    </p>
                    <span className="mt-2 block text-[8px] tracking-widest text-cream/70">
                      Edition 2026
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="min-w-0 lg:col-span-6 lg:pl-6"
            >
              <h2 className="font-serif text-[1.75rem] font-normal leading-[1.18] tracking-tight text-ink sm:text-4xl lg:text-[50px]">
                Free Strategic Guide for <br className="hidden sm:block" />
                Real Estate Leaders &amp; Executives
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
                Get Kamaldeep&apos;s proven framework on real estate asset
                scaling, strategic market positioning, and high-value
                partnerships delivered directly to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 flex max-w-lg flex-col gap-3 sm:mt-9 sm:flex-row sm:items-stretch sm:gap-0"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    // text-base on mobile: 16px stops iOS from zooming in when the field is tapped
                    className="w-full border border-ink/20 bg-cream/70 px-5 py-4 text-base text-ink placeholder:text-muted transition-all duration-300 focus:border-ink focus:bg-cream focus:outline-none sm:text-sm"
                  />
                </div>

                <button type="submit" className="btn w-full sm:w-auto sm:shrink-0">
                  {status === "success" ? "SUBSCRIBED!" : "SUBSCRIBE"}
                </button>
              </form>

              <div aria-live="polite">
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs font-medium text-olive"
                  >
                    Thank you! Your strategic guide is on its way to your inbox.
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}