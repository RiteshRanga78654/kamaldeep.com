"use client";

import { useEffect } from "react";

export function SiteScripts() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    function setupActiveNav() {
      const navLinks = document.getElementById("navLinks");
      if (!navLinks) return;
      const sections = ["home", "about", "experience", "work", "blog", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      if (!sections.length) return;
      const navA = Array.from(navLinks.querySelectorAll("a"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              navA.forEach((a) => a.classList.remove("active"));
              const match = navA.find(
                (a) => a.getAttribute("href") === "#" + e.target.id
              );
              if (match) match.classList.add("active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => observer.observe(s));
      cleanups.push(() => observer.disconnect());
    }
    setupActiveNav();

    function setupReveal() {
      if (reduced) return;
      const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
      if (!revealEls.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => observer.observe(el));
      cleanups.push(() => observer.disconnect());
    }
    setupReveal();

    function setupCounters() {
      if (reduced) return;
      const counters = document.querySelectorAll(".stat-num");
      if (!counters.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.getAttribute("data-count"), 10);
              const suffix = el.getAttribute("data-suffix") || "";
              const dur = 1400;
              const start = performance.now();
              function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (p < 1) requestAnimationFrame(tick);
              }
              requestAnimationFrame(tick);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => observer.observe(c));
      cleanups.push(() => observer.disconnect());
    }
    setupCounters();

    function setupParallax() {
      if (reduced) return;
      const portrait = document.querySelector(".portrait-frame svg");
      if (!portrait) return;
      const onMove = (e) => {
        if (window.innerWidth <= 980) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        portrait.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    }
    setupParallax();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}