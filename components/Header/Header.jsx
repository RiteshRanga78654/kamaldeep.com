"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeOnMobile = () => {
    if (window.innerWidth <= 980) setOpen(false);
  };

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <div className="container nav-wrap">
        <a href="#home" className="logo">
          <span className="logo-mark">KP</span>Kamaldeep.com
        </a>
        <nav className={open ? "links open" : "links"} id="navLinks">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={closeOnMobile} className={link.label === "Home" ? "active" : ""}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-dark">
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}