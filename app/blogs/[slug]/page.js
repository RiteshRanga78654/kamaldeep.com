import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { fetchBlogs, fetchBlogBySlug, fetchRelatedBlogs } from "@/lib/api/blogs";
import { profile } from "@/lib/data/profile";
import { BlogCover } from "@/components/ui/BlogCover";
import { BlogCard } from "@/components/Blogs/BlogCard";
import { ShareBar } from "@/components/Blogs/ShareBar";

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await fetchBlogBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogDetailPage({ params }) {
  const post = await fetchBlogBySlug(params.slug);
  if (!post) notFound();

  const related = await fetchRelatedBlogs(params.slug, 3);

  return (
    <main style={{ backgroundColor: "#fbf9f5", color: "#1c1917", minHeight: "100vh" }}>
      <article style={{ paddingBottom: "7rem", paddingTop: "7.5rem" }}>
        
        {/* TOP HEADER SECTION */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <Link
            href="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.84rem",
              fontWeight: "600",
              color: "#786d5e",
              textDecoration: "none",
              backgroundColor: "#ede7dc",
              padding: "6px 16px",
              borderRadius: "20px",
              marginBottom: "2rem",
            }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Perspectives
          </Link>

          <div style={{ maxWidth: "980px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <span
                style={{
                  fontSize: "0.76rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#b87042",
                  fontWeight: "700",
                  backgroundColor: "rgba(184, 112, 66, 0.12)",
                  padding: "4px 12px",
                  borderRadius: "14px",
                }}
              >
                {post.category}
              </span>
              <span style={{ color: "#c4b9ac" }}>•</span>
              <span style={{ color: "#786d5e", fontSize: "0.84rem" }}>{formatDate(post.date)}</span>
              <span style={{ color: "#c4b9ac" }}>•</span>
              <span style={{ color: "#786d5e", fontSize: "0.84rem" }}>{post.readingTime || "5 min read"}</span>
            </div>

            <h1
              style={{
                fontFamily: "serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: "1.14",
                letterSpacing: "-0.8px",
                color: "#1c1917",
                margin: "0 0 1.5rem 0",
              }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p
                style={{
                  fontSize: "1.18rem",
                  lineHeight: "1.65",
                  color: "#574f45",
                  margin: 0,
                  maxWidth: "840px",
                }}
              >
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* HERO IMAGE CONTAINER */}
        <div style={{ maxWidth: "1280px", margin: "2.8rem auto 4rem auto", padding: "0 24px" }}>
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(184, 112, 66, 0.15)",
              boxShadow: "0 20px 45px -15px rgba(66, 44, 28, 0.1)",
            }}
          >
            <BlogCover
              category={post.category}
              title={post.title}
              className="aspect-[21/9] w-full max-h-[520px] object-cover"
            />
          </div>
        </div>

        {/* 3-COLUMN EDITORIAL CONTENT GRID (Fills Left & Right Empty Spaces) */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "220px 1fr 280px",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          
          {/* LEFT RAIL: Sticky Quick Meta & Actions */}
          <aside
            style={{
              position: "sticky",
              top: "120px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#8a7e72", fontWeight: "700" }}>
                Reading Index
              </span>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#b87042", fontSize: "0.85rem", fontWeight: "600" }}>
                  <BookOpen size={14} /> Full Perspective
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#786d5e", fontSize: "0.85rem" }}>
                  <Clock size={14} /> {post.readingTime || "5 min"}
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(28,25,23,0.1)", paddingTop: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#8a7e72", fontWeight: "700", display: "block", marginBottom: "12px" }}>
                Share Insight
              </span>
              <ShareBar title={post.title} />
            </div>
          </aside>

          {/* CENTER: Main Article Prose */}
          <div
            style={{
              fontSize: "1.12rem",
              lineHeight: "1.9",
              color: "#38322c",
            }}
          >
            {post.content.map((para, i) => (
              <p
                key={i}
                style={{
                  marginBottom: "1.85rem",
                  ...(i === 0
                    ? {
                        fontSize: "1.24rem",
                        color: "#1c1917",
                        lineHeight: "1.8",
                        fontWeight: "450",
                      }
                    : {}),
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* RIGHT RAIL: Author Dossier & Strategic Takeaways */}
          <aside
            style={{
              position: "sticky",
              top: "120px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Author Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(184, 112, 66, 0.18)",
                borderRadius: "20px",
                padding: "22px",
                boxShadow: "0 10px 25px rgba(66, 44, 28, 0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#1c1917",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "0.95rem",
                  }}
                >
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#1c1917" }}>
                    {profile.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#8a7e72" }}>
                    Business Head
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.84rem", color: "#6b6156", lineHeight: "1.5", margin: "0 0 14px 0" }}>
                Leading corporate alliances, education architecture, and market growth across India.
              </p>

              <Link
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  backgroundColor: "#b87042",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                Connect Directly
              </Link>
            </div>

            {/* Strategic Takeaway Note */}
            <div
              style={{
                backgroundColor: "rgba(184, 112, 66, 0.06)",
                border: "1px dashed rgba(184, 112, 66, 0.3)",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#b87042", fontWeight: "700", fontSize: "0.82rem", marginBottom: "8px" }}>
                <Sparkles size={14} /> Core Focus
              </div>
              <p style={{ fontSize: "0.82rem", color: "#61574b", lineHeight: "1.5", margin: 0 }}>
                This perspective addresses strategic alignment, scaling business units, and closing institutional gaps.
              </p>
            </div>
          </aside>

        </div>

        {/* RELATED INSIGHTS SECTION */}
        {related.length > 0 && (
          <div
            style={{
              maxWidth: "1280px",
              margin: "6rem auto 0 auto",
              padding: "4rem 24px 0 24px",
              borderTop: "1px solid rgba(28, 25, 23, 0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2.5rem" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#b87042",
                    fontWeight: "700",
                  }}
                >
                  Keep Reading
                </span>
                <h2
                  style={{
                    fontFamily: "serif",
                    fontSize: "2.2rem",
                    color: "#1c1917",
                    margin: "4px 0 0 0",
                  }}
                >
                  Related Perspectives
                </h2>
              </div>

              <Link
                href="/blogs"
                style={{
                  fontSize: "0.86rem",
                  fontWeight: "700",
                  color: "#1c1917",
                  textDecoration: "none",
                  borderBottom: "1.5px solid #1c1917",
                  paddingBottom: "2px",
                }}
              >
                View All Articles →
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
              }}
            >
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}

      </article>
    </main>
  );
}