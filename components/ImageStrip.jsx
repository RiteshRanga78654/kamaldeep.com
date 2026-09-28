import Image from "next/image";


const INSTAGRAM_URL = "https://www.instagram.com/officialkamaldeep.01/";

// Har photo ka alag Instagram post link bhi de sakte ho (href badal do)
const images = [
  { src: "/profile/kamal01/Tks000223.jpeg", href: INSTAGRAM_URL },
  { src: "/profile/kamal01/TkS00522.JPG", href: INSTAGRAM_URL },
  { src: "/profile/kamal01/TKS05223.JPG", href: INSTAGRAM_URL },
  { src: "/profile/kamal01/TKS05243.JPG", href: INSTAGRAM_URL },
  { src: "/profile/kamal01/TKS05249.JPG", href: INSTAGRAM_URL },
  { src: "/profile/kamal01/TKS05377.JPG", href: INSTAGRAM_URL },
];

export default function ImageStrip() {
  return (
    <section className="grid grid-cols-3 md:grid-cols-6">
      {images.map((img, i) => (
        <a
          key={i}
          href={img.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Instagram (opens in a new tab)"
          className="group relative block aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        >
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(min-width: 768px) 16vw, 33vw"
          />

          {/* Hover / keyboard-focus overlay with the Instagram icon in the centre */}
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 scale-90 text-white transition-transform duration-300 group-hover:scale-100 group-focus-visible:scale-100 sm:h-10 sm:w-10"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </span>
        </a>
      ))}
    </section>
  );
}