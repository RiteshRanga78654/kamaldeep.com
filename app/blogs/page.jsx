"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageStrip from "@/components/ImageStrip";
import BlogCard from "@/components/BlogCard";
import NewsletterCard from "@/components/NewsletterCard";
import PageFonts from "@/components/PageFonts";

import { CATEGORIES, POSTS } from "./posts";

/**
 * Blog listing.
 *
 * Same design system as the article page (`[slug]/page.jsx`): cream / olive /
 * sand palette, Cormorant display type, Work Sans copy, `container-x` rhythm.
 * Demo copy lives in `./posts` — swap it for a real data source freely.
 */

const PAGE_SIZE = 6;
const CARD_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";
const FEATURE_SIZES = "(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 100vw";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark";

/* ---------------------------------------------------------------- pieces */

function FeatureCard({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group relative min-h-[300px] flex-[1.7] overflow-hidden rounded-[3px] bg-ink ${FOCUS_RING}`}
    >
      <Image
        src={post.img}
        alt={post.imgAlt || post.title}
        fill
        sizes={FEATURE_SIZES}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <span className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(43,41,36,0)_30%,rgba(43,41,36,0.92)_100%)] p-6">
        <span className="mb-3 w-fit rounded-full bg-cream/95 px-3 py-1 text-[11.5px] font-semibold text-olive-dark">
          Editor&apos;s pick
        </span>
        <span className="line-clamp-3 font-cormorant font-light text-[22px] leading-[1.25] text-cream md:text-[26px]">
          {post.title}
        </span>
        <span className="mt-3 flex items-center gap-2 text-[12.5px] text-cream/75">
          <span>{post.category}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cream/50" />
          <span>{post.readingTime}</span>
        </span>
      </span>
    </Link>
  );
}

function CategoryFilter({ active, counts, onSelect }) {
  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${FOCUS_RING} ${
              isActive
                ? "border-ink bg-ink text-cream"
                : "border-ink/15 text-ink hover:border-olive hover:text-olive-dark"
            }`}
          >
            {category}
            <span
              className={`text-[11.5px] font-normal ${isActive ? "text-cream/70" : "text-muted"}`}
            >
              {counts[category] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SearchField({ value, onChange }) {
  return (
    <div className="relative w-full lg:max-w-[20rem]">
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="9" cy="9" r="5.5" />
        <path d="m13.5 13.5 3.5 3.5" />
      </svg>
      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles"
        className={`w-full rounded-full border border-ink/15 bg-transparent py-2.5 pl-10 pr-4 text-[14px] text-ink placeholder:text-muted/70 transition-colors focus:border-olive-dark ${FOCUS_RING}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------- sections */

function FeaturedSection() {
  const [feature, ...rest] = POSTS;
  const cards = rest.slice(0, 4);

  // The featured grid needs a lead post + four cards; otherwise skip it and
  // let the full list below carry the page.
  if (cards.length < 4) return null;

  return (
    <section aria-labelledby="featured-heading" className="container-x">
      <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-4">
        <h2
          id="featured-heading"
          className="font-cormorant font-light text-[28px] leading-[1.2] text-ink md:text-[36px]"
        >
          Featured
        </h2>
        <span className="small-text">Latest {POSTS.length} articles</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <div className="flex sm:col-start-1 sm:row-start-1">
          <BlogCard post={cards[0]} sizes={CARD_SIZES} priority />
        </div>
        <div className="flex sm:col-start-2 sm:row-start-1">
          <BlogCard post={cards[1]} sizes={CARD_SIZES} />
        </div>
        <div className="flex sm:col-start-1 sm:row-start-2">
          <BlogCard post={cards[2]} sizes={CARD_SIZES} />
        </div>
        <div className="flex sm:col-start-2 sm:row-start-2">
          <BlogCard post={cards[3]} sizes={CARD_SIZES} />
        </div>

        <div className="flex flex-col gap-6 sm:col-span-2 sm:row-start-3 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <FeatureCard post={feature} />
          <div className="flex-1">
            <NewsletterCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function AllPostsSection({ activeCategory, onSelectCategory }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const result = { All: POSTS.length };
    for (const post of POSTS) {
      result[post.category] = (result[post.category] ?? 0) + 1;
    }
    return result;
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const inCategory = activeCategory === "All" || post.category === activeCategory;
      const inSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term);
      return inCategory && inSearch;
    });
  }, [activeCategory, query]);

  const visiblePosts = filtered.slice(0, visible);
  const remaining = filtered.length - visiblePosts.length;

  function handleSelect(category) {
    onSelectCategory(category);
    setVisible(PAGE_SIZE);
  }

  function handleSearch(value) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  function resetFilters() {
    setQuery("");
    onSelectCategory("All");
    setVisible(PAGE_SIZE);
  }

  return (
    <section aria-labelledby="all-heading" className="container-x mt-24 sm:mt-28">
      <div className="flex flex-col gap-6 border-b border-ink/10 pb-6">
        <h2
          id="all-heading"
          className="font-cormorant font-light text-[28px] leading-[1.2] text-ink md:text-[36px]"
        >
          All Blog &amp; Article
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter active={activeCategory} counts={counts} onSelect={handleSelect} />
          <SearchField value={query} onChange={handleSearch} />
        </div>
      </div>

      <p className="small-text mt-5" role="status" aria-live="polite">
        Showing {visiblePosts.length} of {filtered.length}{" "}
        {filtered.length === 1 ? "article" : "articles"}
      </p>

      {visiblePosts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard key={post.slug} post={post} sizes={CARD_SIZES} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[3px] border border-ink/10 bg-sand px-6 py-14 text-center">
          <p className="font-cormorant font-light text-[24px] text-ink">No articles found</p>
          <p className="body-text mt-2">
            Try a different keyword or pick another category.
          </p>
          <button type="button" onClick={resetFilters} className="btn mt-6">
            Clear filters
          </button>
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn"
          >
            Load {Math.min(PAGE_SIZE, remaining)} more
          </button>
        </div>
      )}
    </section>
  );
}

/* ----------------------------------------------------------------- root */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="bg-cream font-work-sans text-muted">
      <PageFonts />
      <Header />

      <main className="pb-20 pt-32 sm:pb-24 sm:pt-40">
        <section className="container-x">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-olive-dark">
            Journal
          </p>
          <h1 className="mt-4 text-balance font-cormorant font-light text-[36px] leading-[1.08] text-ink sm:text-[48px] lg:text-[60px]">
            Latest Blog &amp; Article
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.8] text-muted">
            Practical writing on content, community and turning an audience into
            a business — written for creators who would rather build something
            durable than chase a trend.
          </p>
        </section>

        <div className="mt-14 sm:mt-16">
          <FeaturedSection />
        </div>

        <AllPostsSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </main>

      <ImageStrip />
      <Footer />
    </div>
  );
}