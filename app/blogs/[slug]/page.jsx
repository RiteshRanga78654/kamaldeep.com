import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageStrip from "@/components/ImageStrip";
import BlogCard from "@/components/BlogCard";
import NewsletterCard from "@/components/NewsletterCard";
import PageFonts from "@/components/PageFonts";

import { POSTS, getAdjacentPosts, getPostBySlug, getRelatedPosts } from "../posts";

/**
 * Single article page (server component).
 * Prerenders every slug via `generateStaticParams`; unknown slugs → `notFound()`.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kamaldeep.com";
const HERO_SIZES = "(min-width: 1200px) 1200px, 100vw";
const RELATED_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found — Kamaldeep.com" };
  }

  return {
    title: `${post.title} — Kamaldeep.com`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.img }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.img],
    },
  };
}

/* ---------------------------------------------------------------- pieces */

function Breadcrumb({ post }) {
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
          <Link href="/blogs" className="transition-colors hover:text-olive-dark">
            Blog
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">/</li>
        <li aria-current="page" className="min-w-0 truncate text-ink">
          {post.title}
        </li>
      </ol>
    </nav>
  );
}

function ArticleMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-muted">
      <Link
        href="/blogs"
        className="rounded-full border border-olive/40 px-3 py-1 font-semibold text-olive-dark transition-colors hover:border-olive-dark hover:bg-olive-dark hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
      >
        {post.category}
      </Link>
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/50" />
      <span>{post.readingTime}</span>
    </div>
  );
}

function ShareLinks({ post }) {
  const url = encodeURIComponent(`${SITE_URL}/blogs/${post.slug}`);
  const text = encodeURIComponent(post.title);

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${url}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 text-[13px]">
      <span className="text-ink">Share</span>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.label}`}
              className="inline-block rounded-full border border-ink/15 px-3.5 py-1.5 text-ink transition-colors hover:border-olive-dark hover:text-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleBody({ paragraphs }) {
  const [lead, ...rest] = paragraphs;

  return (
    <div className="mx-auto mt-12 max-w-[42rem] text-[17px] leading-[1.9] sm:mt-14">
      {lead && (
        <p className="font-cormorant text-[22px] leading-[1.6] text-ink sm:text-[25px]">
          {lead}
        </p>
      )}
      <div className="mt-8 space-y-7">
        {rest.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function HighlightList({ items }) {
  if (!items?.length) return null;

  return (
    <aside
      aria-labelledby="takeaways-heading"
      className="mt-14 rounded-[3px] border-l-2 border-olive bg-sand p-6 sm:p-8"
    >
      <h2 id="takeaways-heading" className="font-cormorant text-[24px] leading-[1.2] text-ink">
        Key takeaways
      </h2>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15.5px] leading-[1.7]">
            <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-olive" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function AdjacentNav({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More articles"
      className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[3px] border border-ink/10 bg-ink/10 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/blogs/${previous.slug}`}
          rel="prev"
          className="group flex flex-col gap-1.5 bg-cream p-6 transition-colors duration-200 hover:bg-sand/60 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-olive-dark"
        >
          <span className="text-[12.5px] text-olive-dark">← Previous article</span>
          <span className="font-cormorant text-[20px] leading-[1.3] text-ink transition-colors group-hover:text-olive-dark">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden bg-cream sm:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/blogs/${next.slug}`}
          rel="next"
          className="group flex flex-col gap-1.5 bg-cream p-6 transition-colors duration-200 hover:bg-sand/60 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-olive-dark sm:text-right"
        >
          <span className="text-[12.5px] text-olive-dark">Next article →</span>
          <span className="font-cormorant text-[20px] leading-[1.3] text-ink transition-colors group-hover:text-olive-dark">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden bg-cream sm:block" aria-hidden="true" />
      )}
    </nav>
  );
}

function RelatedSection({ posts }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="container-x mt-24 sm:mt-28">
      <div className="flex items-end justify-between gap-6">
        <h2
          id="related-heading"
          className="font-cormorant text-[28px] leading-[1.2] text-ink md:text-[36px]"
        >
          You might also like
        </h2>
        <Link
          href="/blogs"
          className="hidden text-[14px] text-olive-dark underline-offset-4 hover:underline sm:inline"
        >
          All articles
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} sizes={RELATED_SIZES} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const { previous, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.img,
    datePublished: post.date,
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
  };

  return (
    <div className="bg-cream font-work-sans text-muted">
      <PageFonts />
      <Header />

      <main className="pb-20 pt-32 sm:pb-24 sm:pt-40">
        <article className="container-x">
          <Breadcrumb post={post} />

          <header className="mx-auto mt-10 max-w-[48rem] text-center">
            <ArticleMeta post={post} />

            <h1 className="mt-6 text-balance font-cormorant text-[34px] leading-[1.1] text-ink sm:text-[46px] lg:text-[56px]">
              {post.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[38rem] text-pretty text-[17px] leading-[1.75] sm:text-[18px]">
              {post.excerpt}
            </p>
          </header>

          {/* `relative` is required for next/image `fill` */}
          <figure className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[3px] bg-sand sm:mt-14">
            <Image
              src={post.img}
              alt={post.imgAlt || post.title}
              fill
              priority
              sizes={HERO_SIZES}
              className="object-cover"
            />
          </figure>

          <ArticleBody paragraphs={post.content} />

          <div className="mx-auto max-w-[42rem]">
            <HighlightList items={post.highlights} />

            <div className="mt-10 border-t border-ink/10 pt-6">
              <ShareLinks post={post} />
            </div>

            <AdjacentNav previous={previous} next={next} />
          </div>
        </article>

        <RelatedSection posts={related} />

        <div className="container-x mt-24 sm:mt-28">
          <NewsletterCard />
        </div>
      </main>

      <ImageStrip />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}