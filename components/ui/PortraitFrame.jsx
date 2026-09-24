import Image from "next/image";
import { profile } from "@/lib/data/profile";

/**
 * Renders the executive portrait. If a real photo exists at
 * profile.images.portrait, drop it into /public/images/profile/
 * and this component will render it automatically — swap the
 * `usePlaceholder` flag below to false once the file is in place.
 */
const usePlaceholder = true;

export function PortraitFrame({ className = "" }) {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (!usePlaceholder) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={profile.images.portrait}
          alt={profile.name}
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-pista-700 ${className}`}
      role="img"
      aria-label={`Portrait of ${profile.name}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="portraitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5D7147" />
            <stop offset="100%" stopColor="#333E28" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#portraitGrad)" />
        <g opacity="0.35" stroke="#E2E9D6" strokeWidth="0.25">
          <line x1="0" y1="30" x2="100" y2="30" />
          <line x1="0" y1="62" x2="100" y2="62" />
          <line x1="34" y1="0" x2="34" y2="100" />
          <line x1="68" y1="0" x2="68" y2="100" />
        </g>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[5.5rem] italic text-sand-100/90">
        {initials}
      </span>
    </div>
  );
}
