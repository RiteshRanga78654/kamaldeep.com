"use client";

import { useState } from "react";

const Star = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2c.5 3.6 1.6 6 3.8 8.2C18 12.4 20.4 13.5 24 14c-3.6.5-6 1.6-8.2 3.8C13.6 20 12.5 22.4 12 26c-.5-3.6-1.6-6-3.8-8.2C6 15.6 3.6 14.5 0 14c3.6-.5 6-1.6 8.2-3.8C10.4 8 11.5 5.6 12 2Z"
      fill="#C6A653"
    />
  </svg>
);

/**
 * Newsletter signup panel — reused on the blogs listing page and at the end of
 * every article so the call to action stays identical across both routes.
 */
export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-[3px] border border-ink/10 bg-sand p-6 sm:p-7">
      <Star />
      <h3 className="font-cormorant text-[21px] leading-[1.3] text-ink">
        Join our community, subscribe for{" "}
        <em className="italic text-olive-dark">exciting content</em>
      </h3>
      <p className="text-[13px] leading-relaxed text-muted">
        One short email every week — practical ideas on content, community and
        turning an audience into a business.
      </p>

      <form
        className="mt-2 flex flex-col gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          if (email) setSent(true);
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-[13.5px] text-ink placeholder:text-muted/70 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
        />
        <button
          type="submit"
          className="w-full bg-olive px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-200 hover:bg-olive-dark"
        >
          {sent ? "Subscribed" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
