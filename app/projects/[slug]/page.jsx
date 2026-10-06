import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageStrip from "@/components/ImageStrip";
import PageFonts from "@/components/PageFonts";

import {
  findPublishedProject,
  nextPublishedProject,
  publishedProjectSlugs,
} from "@/lib/controller/project";

/**
 * Single project page (server component).
 * Prerenders every slug via `generateStaticParams`; unknown slugs → `notFound()`.
 * Same design system as the blog pages: `container-x`, Cormorant (light) for
 * display type, Work Sans for copy.
 */

const HERO_SIZES = "(min-width: 1200px) 1200px, 100vw";
const GALLERY_SIZES = "(min-width: 1024px) 60vw, 100vw";
const NEXT_SIZES = "(min-width: 768px) 40vw, 100vw";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark";

// Allow non-prerendered slugs to be generated dynamically on first visit
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await publishedProjectSlugs();
    return (slugs || []).map((slug) => ({ slug }));
  } catch (error) {
    console.warn(
      "[generateStaticParams:projects] Skipping build-time prerender due to connection issue:",
      error.message
    );
    // Returning an empty array prevents the build step from failing
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await findPublishedProject(slug);

  if (!project) {
    return { title: "Project not found — Kamaldeep.com" };
  }

  return {
    title: `${project.title} — Kamaldeep.com`,
    description: project.excerpt,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
      images: [{ url: project.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage],
    },
  };
}

/* ---------------------------------------------------------------- pieces */

function Breadcrumb({ project }) {
  return (
    <nav aria-label="Breadcrumb" className="small-text">
      <ol className="flex items-center gap-x-2">
        <li className="shrink-0">
          <Link href="/" className="transition-colors hover:text-olive-dark">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">/</li>
        <li className="shrink-0">
          <Link href="/projects" className="transition-colors hover:text-olive-dark">
            Projects
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">/</li>
        <li aria-current="page" className="min-w-0 truncate text-ink">
          {project.title}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Two-column section: a sticky title on the left (desktop), content on the right.
 * `id` lets the section be linked to directly.
 */
function Section({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="container-x mt-20 scroll-mt-28 sm:mt-28"
    >
      <div className="grid gap-x-12 gap-y-6 border-t border-ink/10 pt-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <h2
          id={`${id}-heading`}
          className="self-start font-cormorant font-light text-[26px] leading-[1.2] text-ink md:text-[32px] lg:sticky lg:top-28"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function FactGrid({ project }) {
  const facts = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Duration", value: project.duration },
    { label: "Services", value: project.services?.join(", ") },
  ].filter((fact) => fact.value);

  return (
    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-ink/10 bg-ink/10 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="min-w-0 bg-cream p-5 sm:p-6">
          <dt className="text-[12.5px] text-olive-dark">{fact.label}</dt>
          <dd className="mt-1.5 text-[15.5px] leading-relaxed text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Gallery({ project }) {
  const images = project.gallery;
  if (!images?.length) return null;

  return (
    <Section id="gallery" title="Selected frames">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {images.map((src, index) => (
          <figure
            key={`${src}-${index}`}
            className={`relative w-full overflow-hidden rounded-[3px] bg-sand ${
              index === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={src}
              alt={`${project.title} — frame ${index + 1} of ${images.length}`}
              fill
              sizes={GALLERY_SIZES}
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Outcomes({ outcomes }) {
  if (!outcomes?.length) return null;

  return (
    <Section id="results" title="What changed">
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {outcomes.map((outcome) => (
          <div
            key={outcome.label}
            className="flex flex-col-reverse justify-end bg-sand px-6 py-8"
          >
            <dt className="mt-3 text-[14px] leading-snug text-muted">{outcome.label}</dt>
            <dd className="font-cormorant font-light text-[44px] leading-none text-ink md:text-[52px]">
              {outcome.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Approach({ steps }) {
  if (!steps?.length) return null;

  return (
    <Section id="approach" title="How it was built">
      {/* Numbers are kept because this really is a sequence of steps. */}
      <ol className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="min-w-0">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="font-cormorant text-[22px] leading-none text-olive-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-ink/15" />
            </div>
            <h3 className="mt-4 font-cormorant font-light text-[22px] leading-[1.25] text-ink md:text-[24px]">
              {step.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.75] text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function NextProject({ project }) {
  if (!project) return null;

  return (
    <section aria-label="Next project" className="container-x mt-24 sm:mt-28">
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid grid-cols-1 items-center gap-6 rounded-[3px] border border-ink/10 bg-sand p-6 transition-colors duration-200 hover:bg-sand/70 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-10 sm:p-8 ${FOCUS_RING}`}
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-cream">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={NEXT_SIZES}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>

        <span className="min-w-0">
          <span className="text-[13px] text-olive-dark">Next project</span>
          <span className="mt-2 block font-cormorant font-light text-[26px] leading-[1.15] text-ink md:text-[34px]">
            {project.title}
          </span>
          <span className="mt-3 block max-w-[46ch] text-[15px] leading-[1.7] text-muted">
            {project.excerpt}
          </span>
          <span className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-[13px] font-semibold text-ink">
            View project
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </span>
        </span>
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export const revalidate = 60;

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await findPublishedProject(slug);

  if (!project) notFound();

  const nextProject = await nextPublishedProject(slug);

  return (
    <div className="bg-cream font-work-sans text-muted">
      <PageFonts />
      <Header />

      <main className="pb-20 pt-32 sm:pb-24 sm:pt-40">
        <article>
          <div className="container-x">
            <Breadcrumb project={project} />

            <header className="mt-10 max-w-[52rem]">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
                <span className="rounded-full border border-olive/40 px-3 py-1 font-semibold text-olive-dark">
                  {project.category}
                </span>
                <span>{project.year}</span>
              </p>

              <h1 className="mt-6 text-balance font-cormorant font-light text-[36px] leading-[1.08] text-ink sm:text-[48px] lg:text-[60px]">
                {project.title}
              </h1>

              <p className="mt-6 max-w-[58ch] text-pretty text-[17px] leading-[1.8] sm:text-[18px]">
                {project.excerpt}
              </p>
            </header>

            {/* `relative` is required for next/image `fill` */}
            <figure className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[3px] bg-sand sm:mt-14">
              <Image
                src={project.coverImage}
                alt={project.alt || project.title}
                fill
                priority
                sizes={HERO_SIZES}
                className="object-cover"
              />
            </figure>

            <FactGrid project={project} />
          </div>

          <Section id="overview" title="The brief">
            <div className="max-w-[42rem] space-y-6 text-[17px] leading-[1.9]">
              {project.overview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section id="challenge" title="What was in the way">
            <p className="max-w-[42rem] text-[17px] leading-[1.9]">{project.challenge}</p>
          </Section>

          <Approach steps={project.approach} />
          <Gallery project={project} />
          <Outcomes outcomes={project.outcomes} />

          <Section id="outcome" title="Where it landed">
            <p className="max-w-[42rem] text-[17px] leading-[1.9]">{project.results}</p>
          </Section>

          <NextProject project={nextProject} />

          <div className="container-x mt-12 text-center">
            <Link
              href="/projects"
              className={`text-[14px] text-olive-dark underline-offset-4 hover:underline ${FOCUS_RING}`}
            >
              ← All projects
            </Link>
          </div>
        </article>
      </main>

      <ImageStrip />
      <Footer />
    </div>
  );
}