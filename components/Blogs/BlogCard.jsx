import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogCover } from "@/components/ui/BlogCover";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post, featured = false }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group block ${featured ? "grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10" : ""}`}
    >
      <BlogCover
        category={post.category}
        title={post.title}
        className={`w-full transition-transform duration-500 ease-premium group-hover:scale-[1.02] ${
          featured ? "aspect-[4/3] sm:aspect-[16/11]" : "aspect-[4/3]"
        }`}
      />
      <div className={featured ? "" : "pt-5"}>
        <div className="flex items-center gap-3 text-xs tracking-widest2 text-pista-600">
          <span>{post.category.toUpperCase()}</span>
          <span aria-hidden="true">·</span>
          <span className="text-stone-500">{formatDate(post.date)}</span>
        </div>
        <h3
          className={`mt-3 font-display leading-snug text-ink transition-colors group-hover:text-pista-700 ${
            featured ? "text-2xl sm:text-3xl lg:text-[2rem]" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
          Read article
          <ArrowUpRight
            size={15}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
          <span className="ml-2 text-stone-500">· {post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
