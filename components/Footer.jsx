import { Children } from "react";

// href sections ke ids se match kiye hain (#about, #services, #blog). "Our Plans" ka link apne hisaab se badal lena.
const pageLinks = [
  { label: "Home", href: "#" },
  { label: "About Me", href: "#about" },
  { label: "Service", href: "#services" },
  { label: "Our Plans", href: "#" },
  { label: "Blog", href: "#blog" },
];

/* ---------- Icons (24x24, outline style, currentColor) ---------- */
function Icon({ children, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FacebookIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Icon>
);

const TwitterIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </Icon>
);

const InstagramIcon = ({ className }) => (
  <Icon className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

const YouTubeIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </Icon>
);

const MailIcon = ({ className }) => (
  <Icon className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </Icon>
);

const PhoneIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

// 👉 Yahan apne asli social profile links daalo
const socials = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12 text-cream/90 sm:py-16">
      {/* Mobile: brand upar (full width), Page + Contact ek row mein. Desktop: 3 columns */}
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-2xl italic text-cream">
            Kamaldeep Prajapati
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Empowering content creators, igniting influence across the
            digital landscape.
          </p>
        </div>

        <div className="min-w-0">
          <p className="font-serif text-lg text-gold">Page</p>
          <ul className="mt-3 space-y-1 text-sm text-cream/70 md:mt-4 md:space-y-3">
            {pageLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="block py-2 hover:text-cream md:inline md:py-0">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <p className="font-serif text-lg text-gold">Contact</p>
          <ul className="mt-3 space-y-1 text-sm text-cream/70 md:mt-4 md:space-y-3">
            <li className="py-2 md:py-0">
              <a
                href="kamaldeep.prajapati@ireedindia.com"
                className="flex items-start gap-2.5 hover:text-cream"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0 break-words">kamaldeep.prajapati@ireedindia.com</span>
              </a>
            </li>
            {/* <li className="py-2 md:py-0">
              <a
                href="tel:+622345678009"
                className="flex items-start gap-2.5 hover:text-cream"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="min-w-0">+62 234 5678 0009</span>
              </a>
            </li> */}
          </ul>

          {/* Social icons: round outlined buttons, 40px tap size */}
          <div className="mt-4 flex flex-wrap gap-3 md:mt-5">
            {socials.map(({ label, href, Icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <SocialIcon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-10 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Kamaldeep Prajapati Template. All
          rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#" className="hover:text-cream">
            Terms and conditions
          </a>
          <a href="#" className="hover:text-cream">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}