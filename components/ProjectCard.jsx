import Image from "next/image";
import Link from "next/link";

const DEFAULT_SIZES = "(min-width: 768px) 46vw, 100vw";

/**
 * Project card shared by the projects listing page and the "next project"
 * rail on a project page. Same skeleton as BlogCard — full-height flex column,
 * clamped title and description, `mt-auto` link — so a grid of project cards
 * lines up exactly the way the blog cards do.
 */
export default function ProjectCard({ project, sizes = DEFAULT_SIZES, priority = false }) {
  return (
    <article className="group flex h-full min-w-0 flex-col">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-sand"
      >
        <Image
          src={project.coverImage}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <p className="mt-5 flex flex-wrap items-center gap-x-2 text-[12px] leading-relaxed text-muted">
        <span className="font-semibold uppercase tracking-[0.14em] text-olive-dark">
          {project.category}
        </span>
        <span aria-hidden="true">•</span>
        <span>{project.year}</span>
      </p>

      <h3 className="mt-2 line-clamp-2 font-cormorant text-[20px] leading-[1.3] text-ink md:text-[22px]">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors duration-200 hover:text-olive-dark"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-2 text-[14px] leading-[1.65] text-muted">
        {project.excerpt}
      </p>

      <span className="mt-auto block pt-5">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block border-b border-ink pb-0.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:border-olive-dark hover:text-olive-dark"
        >
          View Project
        </Link>
      </span>
    </article>
  );
}
