"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-x flex items-center justify-between py-5 sm:py-8">
        {/* Logo: lg screen (1024px) par aur left karne ke liye 'lg:-ml-4' ya 'lg:pl-0' add kiya hai */}
        <a
          href="#"
          className="font-serif text-[1.625rem] italic leading-[30px] text-ink sm:text-4xl sm:leading-[36px] lg:-ml-6.5 xl:ml-[-87px]"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            color: "#5F694B",
          }}
        >
          Kamaldeep.com
        </a>

        {/* Desktop nav: ab 1024px tak hidden rahega, sirf 1024px ke baad (xl: 1280px par) ya lg se upar aayega */}
        <nav
          className="hidden items-center gap-9 xl:flex"
          style={{
            fontFamily: "var(--font-plus-jakarta), 'Work Sans', sans-serif",
            lineHeight: "15px",
            letterSpacing: "1.5px",
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link transition-colors duration-200 hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger Menu: 1024px par bhi visible rahega (xl:hidden) */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown Mobile / Tablet Menu: 1024px par bhi open hoga (xl:hidden) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full border-t border-ink/10 bg-cream/95 shadow-lg backdrop-blur transition-all duration-300 xl:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-x flex flex-col py-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-4 text-sm font-medium uppercase tracking-wider text-ink/80 transition-colors last:border-b-0 hover:text-[#5F694B]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}