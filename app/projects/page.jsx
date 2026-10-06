import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageStrip from "@/components/ImageStrip";
import ProjectCard from "@/components/ProjectCard";
import PageFonts from "@/components/PageFonts";

import { CLIENT_LOGOS, PROCESS } from "./section-copy";
import { listPublishedProjects } from "@/lib/controller/project";

/**
 * Projects listing (server component — it has no client state, so it can also
 * export `metadata`).
 *
 * Same design system as the blog and project-detail pages: `container-x`,
 * Cormorant (light) display type, Work Sans copy, `components/ProjectCard.jsx`.
 * Demo copy lives in `./project-data`.
 */

export const metadata = {
  title: "Projects — Kamaldeep.com",
  description:
    "Recent coaching launches, content systems and brand refreshes built for creators turning an audience into a business.",
  alternates: { canonical: "/projects" },
};

const CARD_SIZES = "(min-width: 768px) 46vw, 100vw";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark";

/* The marquee keyframe and its edge mask are the only things Tailwind can't
   express inline. With reduced motion, the loop stops and the logos wrap into
   a static, centred list (the duplicate set is hidden). */
const MARQUEE_CSS = `
@keyframes pj-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.pj-marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.pj-marquee-track {
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: pj-marquee 30s linear infinite;
}
.pj-marquee:hover .pj-marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .pj-marquee { -webkit-mask-image: none; mask-image: none; }
  .pj-marquee-track {
    animation: none;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px 40px;
    padding: 0 24px;
  }
  .pj-dup { display: none; }
}
`;

/* -------------------------------------------------------------- sections */

function Hero({ count }) {
  return (
    <section
      aria-labelledby="projects-heading"
      className="container-x pb-14 pt-32 sm:pb-20 sm:pt-40"
    >
      <p className="text-[13px] text-olive-dark">
        Selected work · {count} projects
      </p>
      <h1
        id="projects-heading"
        className="mt-4 max-w-[18ch] text-balance font-cormorant font-light text-[38px] leading-[1.06] text-ink sm:text-[52px] lg:text-[68px]"
      >
        Building brands that actually grow
      </h1>
      <p className="mt-6 max-w-[58ch] text-pretty text-[16px] leading-[1.8] text-muted sm:text-[17px]">
        A handful of recent projects — coaching launches, content systems and
        brand refreshes built for creators turning an audience into a business.
      </p>
    </section>
  );
}

function ProjectsGrid({ projects }) {
  return (
    <section aria-label="Projects" className="container-x">
      <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project._id}
            project={project}
            sizes={CARD_SIZES}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="container-x mt-28 sm:mt-32">
      <div className="flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="process-heading"
          className="font-cormorant font-light text-[30px] leading-[1.15] text-ink md:text-[40px]"
        >
          How we work
        </h2>
        <p className="max-w-[40ch] text-[15px] leading-[1.7] text-muted">
          Every project follows the same four stages, so you always know what
          happens next.
        </p>
      </div>

      {/* A real sequence, so the numbering stays. */}
      <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((item) => (
          <li key={item.step} className="min-w-0">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="font-cormorant text-[24px] leading-none text-olive-dark">
                {item.step}
              </span>
              <span className="h-px flex-1 bg-ink/15" />
            </div>
            <h3 className="mt-4 font-cormorant font-light text-[23px] leading-[1.25] text-ink md:text-[25px]">
              {item.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.75] text-muted">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LogoMarquee() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section aria-labelledby="clients-heading" className="mt-28 text-center sm:mt-32">
      <h2 id="clients-heading" className="px-6 text-[14px] font-normal text-muted">
        Trusted by creators &amp; brands
      </h2>
      <div className="pj-marquee mt-8">
        <div className="pj-marquee-track">
          {loop.map((name, index) => {
            const isDuplicate = index >= CLIENT_LOGOS.length;
            return (
              <span
                key={index}
                aria-hidden={isDuplicate || undefined}
                className={`whitespace-nowrap font-cormorant font-light text-[28px] italic text-ink/55 transition-colors duration-200 hover:text-olive-dark ${
                  isDuplicate ? "pj-dup" : ""
                }`}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="container-x mt-28 sm:mt-32">
      <div className="grid gap-8 rounded-[3px] border border-ink/10 bg-sand p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h2
            id="cta-heading"
            className="max-w-[22ch] text-balance font-cormorant font-light text-[30px] leading-[1.12] text-ink md:text-[42px]"
          >
            Have a project in mind? Let&rsquo;s talk about what comes next.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.75] text-muted">
            Share a few lines about where you are and where you want to go — I
            reply personally.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className={`btn ${FOCUS_RING}`}>
            Get in touch
          </Link>
          <Link href="/aboutus" className={`btn-outline ${FOCUS_RING}`}>
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ root */

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await listPublishedProjects();

  return (
    <div className="bg-cream font-work-sans text-muted">
      <style>{MARQUEE_CSS}</style>
      <PageFonts />
      <Header />

      <main className="pb-20 sm:pb-24">
        <Hero count={projects.length} />
        <ProjectsGrid projects={projects} />
        <ProcessSection />
        <LogoMarquee />
        <CtaSection />
      </main>

      <ImageStrip />
      <Footer />
    </div>
  );
}