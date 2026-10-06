import Image from "next/image";
import Link from "next/link";

import { formatDate, isoDate } from "@/lib/utils/format";

const DEFAULT_SIZES =
  "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";

/**
 * Blog card shared by the listing page, the related-posts rail on an article
 * page and the 404 page, so every card in the site is pixel-identical.
 *
 * Takes an article document straight from MongoDB — `coverImage` and
 * `publishedAt` come from the database, nothing is reshaped in between.
 *
 * The card is a full-height flex column with a clamped title and excerpt and a
 * `mt-auto` footer link, which is what keeps a grid of cards perfectly aligned:
 * media blocks line up, titles occupy the same number of lines, and the
 * "Read More" rule always sits on the same baseline.
 */
export default function BlogCard({ post, sizes = DEFAULT_SIZES, priority = false }) {
  return (
    <article className="group flex h-full min-w-0 flex-col">
      <Link
        href={`/blogs/${post.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-sand"
      >
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[12px] leading-relaxed text-muted">
        <span className="font-semibold uppercase tracking-[0.14em] text-olive-dark">
          {post.category}
        </span>
        <span aria-hidden="true">•</span>
        <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readingTime}</span>
      </p>

      <h3 className="mt-2 line-clamp-2 font-cormorant text-[20px] leading-[1.3] text-ink md:text-[22px]">
        <Link
          href={`/blogs/${post.slug}`}
          className="transition-colors duration-200 hover:text-olive-dark"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-2 text-[14px] leading-[1.65] text-muted">
        {post.excerpt}
      </p>

      <span className="mt-auto block pt-5">
        <Link
          href={`/blogs/${post.slug}`}
          className="inline-block border-b border-ink pb-0.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:border-olive-dark hover:text-olive-dark"
        >
          Read More
        </Link>
      </span>
    </article>
  );
}
