import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";

import {
  fetchBlogs,
  fetchBlogBySlug,
  fetchRelatedBlogs,
} from "@/lib/api/blogs";

import { profile } from "@/lib/data/profile";
import { BlogCover } from "@/components/ui/BlogCover";
import { BlogCard } from "@/components/Blogs/BlogCard";
import { ShareBar } from "@/components/Blogs/ShareBar";


// ============================================================
// STATIC PARAMS
// ============================================================

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}


// ============================================================
// SEO METADATA
// ============================================================

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
  };
}


// ============================================================
// DATE FORMATTER
// ============================================================

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


// ============================================================
// RESPONSIVE STYLES
// Desktop  : 3 columns  (left rail | article | right rail)
// Tablet   : rail bar on top, article + right rail
// Mobile   : single column (article, share, author, focus)
// ============================================================

const css = `
.bd-main{background:#fbf9f5;color:#1c1917;min-height:100vh;overflow-x:hidden}
.bd-article{padding:7.5rem 0 7rem}
.bd-wrap{max-width:1280px;margin:0 auto;padding:0 24px}

.bd-back{display:inline-flex;align-items:center;gap:8px;font-size:.84rem;font-weight:600;color:#786d5e;text-decoration:none;background:#ede7dc;padding:6px 16px;border-radius:20px;margin-bottom:2rem}
.bd-head{max-width:980px}
.bd-meta{display:flex;align-items:center;gap:10px;margin-bottom:1rem;flex-wrap:wrap}
.bd-cat{font-size:.76rem;text-transform:uppercase;letter-spacing:1.5px;color:#b87042;font-weight:700;background:rgba(184,112,66,.12);padding:4px 12px;border-radius:14px}
.bd-dot{color:#c4b9ac}
.bd-meta-t{color:#786d5e;font-size:.84rem}
.bd-h1{font-family:serif;font-size:clamp(2rem,5vw,3.8rem);line-height:1.14;letter-spacing:-.8px;color:#1c1917;margin:0 0 1.5rem;overflow-wrap:anywhere}
.bd-excerpt{font-size:1.18rem;line-height:1.65;color:#574f45;margin:0;max-width:840px}

.bd-hero{max-width:1280px;margin:2.8rem auto 4rem;padding:0 24px}
.bd-hero-box{border-radius:24px;overflow:hidden;border:1px solid rgba(184,112,66,.15);box-shadow:0 20px 45px -15px rgba(66,44,28,.1)}

.bd-grid{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:220px minmax(0,1fr) 280px;grid-template-areas:"left main right";gap:3rem;align-items:start}
.bd-left{grid-area:left;position:sticky;top:120px;display:flex;flex-direction:column;gap:2rem}
.bd-body{grid-area:main;min-width:0;font-size:1.12rem;line-height:1.9;color:#38322c;overflow-wrap:anywhere}
.bd-body p{margin:0 0 1.85rem}
.bd-body p.bd-lead{font-size:1.24rem;color:#1c1917;line-height:1.8;font-weight:450}
.bd-right{grid-area:right;position:sticky;top:120px;display:flex;flex-direction:column;gap:1.5rem}

.bd-label{font-size:.75rem;text-transform:uppercase;letter-spacing:1.5px;color:#8a7e72;font-weight:700;display:block}
.bd-idx{margin-top:10px;display:flex;flex-direction:column;gap:8px}
.bd-idx-a{display:flex;align-items:center;gap:8px;color:#b87042;font-size:.85rem;font-weight:600}
.bd-idx-b{display:flex;align-items:center;gap:8px;color:#786d5e;font-size:.85rem}
.bd-share{border-top:1px solid rgba(28,25,23,.1);padding-top:1.5rem}
.bd-share .bd-label{margin-bottom:12px}

.bd-author{background:#fff;border:1px solid rgba(184,112,66,.18);border-radius:20px;padding:22px;box-shadow:0 10px 25px rgba(66,44,28,.04)}
.bd-author-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.bd-avatar{width:44px;height:44px;border-radius:50%;background:#1c1917;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.95rem;flex-shrink:0}
.bd-author-name{font-weight:700;font-size:.95rem;color:#1c1917}
.bd-author-role{font-size:.78rem;color:#8a7e72}
.bd-author-p{font-size:.84rem;color:#6b6156;line-height:1.5;margin:0 0 14px}
.bd-cta{display:inline-flex;align-items:center;justify-content:center;gap:6px;width:100%;box-sizing:border-box;background:#b87042;color:#fff;font-size:.82rem;font-weight:600;padding:10px 14px;border-radius:10px;text-decoration:none}
.bd-focus{background:rgba(184,112,66,.06);border:1px dashed rgba(184,112,66,.3);border-radius:18px;padding:20px}
.bd-focus-t{display:flex;align-items:center;gap:6px;color:#b87042;font-weight:700;font-size:.82rem;margin-bottom:8px}
.bd-focus-p{font-size:.82rem;color:#61574b;line-height:1.5;margin:0}

.bd-related{max-width:1280px;margin:6rem auto 0;padding:4rem 24px 0;border-top:1px solid rgba(28,25,23,.1)}
.bd-rel-head{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem}
.bd-kicker{font-size:.8rem;text-transform:uppercase;letter-spacing:2px;color:#b87042;font-weight:700}
.bd-h2{font-family:serif;font-size:clamp(1.7rem,4vw,2.2rem);color:#1c1917;margin:4px 0 0}
.bd-all{font-size:.86rem;font-weight:700;color:#1c1917;text-decoration:none;border-bottom:1.5px solid #1c1917;padding-bottom:2px}
.bd-rel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:2rem}

.bd-main a:focus-visible{outline:3px solid #b87042;outline-offset:3px}

/* ---------- Tablet ---------- */
@media (max-width:1100px){
  .bd-grid{grid-template-columns:minmax(0,1fr) 260px;grid-template-areas:"left left" "main right";gap:2rem 2.5rem}
  .bd-left{position:static;flex-direction:row;flex-wrap:wrap;align-items:flex-start;gap:1.5rem 3.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(28,25,23,.1)}
  .bd-share{border-top:none;padding-top:0;min-width:0;max-width:100%}
  .bd-share-in{display:flex;flex-wrap:wrap;align-items:center;gap:10px;max-width:100%}
  .bd-share-in>*{display:flex;flex-wrap:wrap;align-items:center;gap:10px;max-width:100%}
  .bd-share-in a,.bd-share-in button{flex-shrink:0}
  .bd-right{top:100px}
}

/* ---------- Mobile ---------- */
@media (max-width:820px){
  .bd-article{padding:5.5rem 0 4rem}
  .bd-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"main" "left" "right";gap:2rem}
  .bd-left{padding:1.5rem 0 0;border-bottom:none;border-top:1px solid rgba(28,25,23,.1);gap:1.5rem 3rem}
  .bd-share{flex:1 1 100%;width:100%}
  .bd-right{position:static;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
  .bd-hero{margin:2rem auto 2.5rem}
  .bd-related{margin-top:4rem;padding-top:3rem}
}

@media (max-width:600px){
  .bd-wrap,.bd-hero,.bd-grid,.bd-related{padding-left:16px;padding-right:16px}
  .bd-hero-box{border-radius:16px}
  .bd-excerpt{font-size:1.06rem}
  .bd-body{font-size:1.03rem;line-height:1.8}
  .bd-body p{margin-bottom:1.5rem}
  .bd-body p.bd-lead{font-size:1.12rem}
  .bd-back{margin-bottom:1.5rem}
  .bd-rel-grid{gap:1.25rem}
}
`;


// ============================================================
// BLOG DETAIL PAGE
// ============================================================

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await fetchRelatedBlogs(slug, 3);

  return (
    <main className="bd-main">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <article className="bd-article">

        {/* ================= TOP HEADER ================= */}

        <div className="bd-wrap">

          <Link href="/blogs" className="bd-back">
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Perspectives
          </Link>

          <div className="bd-head">

            <div className="bd-meta">
              <span className="bd-cat">{post.category}</span>
              <span className="bd-dot">•</span>
              <span className="bd-meta-t">{formatDate(post.date)}</span>
              <span className="bd-dot">•</span>
              <span className="bd-meta-t">{post.readingTime || "5 min read"}</span>
            </div>

            <h1 className="bd-h1">{post.title}</h1>

            {post.excerpt && <p className="bd-excerpt">{post.excerpt}</p>}

          </div>

        </div>


        {/* ================= HERO IMAGE ================= */}

        <div className="bd-hero">
          <div className="bd-hero-box">
            <BlogCover
              category={post.category}
              title={post.title}
              className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full max-h-[520px] object-cover"
            />
          </div>
        </div>


        {/* ================= CONTENT GRID ================= */}

        <div className="bd-grid">

          {/* LEFT RAIL */}
          <aside className="bd-left">

            <div>
              <span className="bd-label">Reading Index</span>

              <div className="bd-idx">
                <div className="bd-idx-a">
                  <BookOpen size={14} />
                  Full Perspective
                </div>

                <div className="bd-idx-b">
                  <Clock size={14} />
                  {post.readingTime || "5 min"}
                </div>
              </div>
            </div>

            <div className="bd-share">
              <span className="bd-label">Share Insight</span>
              <div className="bd-share-in">
                <ShareBar title={post.title} />
              </div>
            </div>

          </aside>


          {/* CENTER CONTENT */}
          <div className="bd-body">
            {post.content.map((para, i) => (
              <p key={i} className={i === 0 ? "bd-lead" : undefined}>
                {para}
              </p>
            ))}
          </div>


          {/* RIGHT RAIL */}
          <aside className="bd-right">

            <div className="bd-author">

              <div className="bd-author-top">
                <div className="bd-avatar">{profile.name.charAt(0)}</div>

                <div>
                  <div className="bd-author-name">{profile.name}</div>
                  <div className="bd-author-role">Business Head</div>
                </div>
              </div>

              <p className="bd-author-p">
                Leading corporate alliances, education architecture,
                and market growth across India.
              </p>

              <Link href="#contact" className="bd-cta">
                Connect Directly
              </Link>

            </div>

            <div className="bd-focus">
              <div className="bd-focus-t">
                <Sparkles size={14} />
                Core Focus
              </div>

              <p className="bd-focus-p">
                This perspective addresses strategic alignment,
                scaling business units, and closing institutional gaps.
              </p>
            </div>

          </aside>

        </div>


        {/* ================= RELATED INSIGHTS ================= */}

        {related.length > 0 && (
          <div className="bd-related">

            <div className="bd-rel-head">
              <div>
                <span className="bd-kicker">Keep Reading</span>
                <h2 className="bd-h2">Related Perspectives</h2>
              </div>

              <Link href="/blogs" className="bd-all">
                View All Articles →
              </Link>
            </div>

            <div className="bd-rel-grid">
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

