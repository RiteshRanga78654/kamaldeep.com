"use client"
import React, { useState, useEffect } from "react";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ImageStrip from '../../components/ImageStrip'
/**
 * BlogPage — recreation of the "Risy" Elementor blog template layout.
 * Palette and type pulled from the kit's own global.json (Cormorant Infant /
 * Work Sans, warm cream + olive palette). Photography is not included in the
 * Elementor export (only attachment IDs), so placeholder images stand in —
 * swap the `img` fields in POSTS/GALLERY for your own media.
 *
 * Drop into any React app: <BlogPage />
 */

/* ---------------------------------------------------------------------- */
/*  Data                                                                   */
/* ---------------------------------------------------------------------- */

const POSTS = [
  {
    id: 1,
    title: "Building Your Personal Brand: Effective Steps to Establishing a Strong Online Presence",
    author: "Jane Doe",
    date: "Jul 17, 2023",
    img: "https://picsum.photos/seed/risy-1/700/700",
  },
  {
    id: 2,
    title: "Navigating the Social Media, Insights and Best Practices for Content Creators",
    author: "Jane Doe",
    date: "Jul 17, 2023",
    img: "https://picsum.photos/seed/risy-2/700/700",
  },
  {
    id: 3,
    title: "The Power of Engagement, Strategies to Connect and Build a Loyal Audience",
    author: "Jane Doe",
    date: "Jul 17, 2023",
    img: "https://picsum.photos/seed/risy-3/700/700",
  },
  {
    id: 4,
    title: "Unleashing Your Creativity, Tips and Techniques for Content Creation Success",
    author: "Jane Doe",
    date: "Jul 17, 2023",
    img: "https://picsum.photos/seed/risy-4/700/700",
  },
  {
    id: 5,
    title: "The Art of Captivating Your Audience with Impactful Stories and Visuals",
    author: "Jane Doe",
    date: "Jul 16, 2023",
    img: "https://picsum.photos/seed/risy-5/900/1100",
    big: true,
  },
  {
    id: 6,
    title: "Monetizing Your Content as an Influencer and Unlocking Revenue Streams",
    author: "Jane Doe",
    date: "Jul 16, 2023",
    img: "https://picsum.photos/seed/risy-6/700/700",
  },
  {
    id: 7,
    title: "Consistency Over Perfection: Building a Sustainable Posting Rhythm",
    author: "Jane Doe",
    date: "Jul 14, 2023",
    img: "https://picsum.photos/seed/risy-7/700/700",
  },
  {
    id: 8,
    title: "From Followers to Community: Turning Views into Real Connection",
    author: "Jane Doe",
    date: "Jul 12, 2023",
    img: "https://picsum.photos/seed/risy-8/700/700",
  },
];

const GALLERY = [
  "https://picsum.photos/seed/risy-g1/400/500",
  "https://picsum.photos/seed/risy-g2/400/500",
  "https://picsum.photos/seed/risy-g3/400/500",
  "https://picsum.photos/seed/risy-g4/400/500",
  "https://picsum.photos/seed/risy-g5/400/500",
  "https://picsum.photos/seed/risy-g6/400/500",
];

/* ---------------------------------------------------------------------- */
/*  Icons                                                                   */
/* ---------------------------------------------------------------------- */

const Star = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c.5 3.6 1.6 6 3.8 8.2C18 12.4 20.4 13.5 24 14c-3.6.5-6 1.6-8.2 3.8C13.6 20 12.5 22.4 12 26c-.5-3.6-1.6-6-3.8-8.2C6 15.6 3.6 14.5 0 14c3.6-.5 6-1.6 8.2-3.8C10.4 8 11.5 5.6 12 2Z"
      fill="#C9A24B"
    />
  </svg>
);

/* ---------------------------------------------------------------------- */
/*  Small pieces                                                          */
/* ---------------------------------------------------------------------- */

function PostMeta({ author, date }) {
  return (
    <p className="bp-meta">
      By <span>{author}</span> <span className="bp-dot">•</span> {date}
    </p>
  );
}

function PostCard({ post }) {
  return (
    <article className="bp-card">
      <a href="#" className="bp-card-media">
        <img src={post.img} alt={post.title} loading="lazy" />
      </a>
      <PostMeta author={post.author} date={post.date} />
      <h3 className="bp-card-title">
        <a href="#">{post.title}</a>
      </h3>
      <a href="#" className="bp-read-more">
        Read More
      </a>
    </article>
  );
}

function FeatureCard({ post }) {
  return (
    <a href="#" className="bp-feature-big">
      <img src={post.img} alt={post.title} />
      <div className="bp-feature-overlay">
        <PostMeta author={post.author} date={post.date} />
        <h3>{post.title}</h3>
      </div>
    </a>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="bp-newsletter-card">
      <Star />
      <h3>
        Join our Community: Subscribe to Our Newsletter for{" "}
        <em>Exciting Content</em>
      </h3>
      <p>Quisque egestas diam in arcu cursus euismod. Cone mauris rhoncus aenean.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email) setSent(true);
        }}
      >
        <input
          type="email"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{sent ? "Subscribed" : "Subscribe"}</button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Sections                                                               */
/* ---------------------------------------------------------------------- */

function LatestSection() {
  const [a, b, c, d, big] = POSTS.slice(0, 5);
  return (
    
    <section className="bp-section pt-100">
      <h1 className="bp-h1">Latest Blog &amp; Article</h1>

      <div className="bp-hero-grid">
        <div className="bp-slot-a">
          <PostCard post={a} />
        </div>
        <div className="bp-slot-b">
          <PostCard post={b} />
        </div>
        <div className="bp-slot-d">
          <PostCard post={c} />
        </div>
        <div className="bp-slot-e">
          <PostCard post={d} />
        </div>
        <div className="bp-slot-c">
          <FeatureCard post={big} />
          <NewsletterCard />
        </div>
      </div>
    </section>

  );
}

function AllPostsSection() {
  const PAGE = 6;
  const [visible, setVisible] = useState(PAGE);

  return (
    <section className="bp-section bp-all-section">
      <h2 className="bp-h2">All Blog &amp; Article</h2>

      <div className="bp-all-grid">
        {POSTS.slice(0, visible).map((p) => (
          <PostCard post={p} key={p.id} />
        ))}
      </div>

      {visible < POSTS.length && (
        <button
          className="bp-load-more"
          onClick={() => setVisible((v) => Math.min(v + PAGE, POSTS.length))}
        >
          Load More
        </button>
      )}
    </section>
  );
}

function Gallery() {
  return (
    <section className="bp-gallery">
      {GALLERY.map((src, i) => (
        <a href="#" className="bp-gallery-item" key={i}>
          <img src={src} alt="" loading="lazy" />
        </a>
      ))}
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Fonts                                                                  */
/* ---------------------------------------------------------------------- */

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("bp-fonts")) return;
    const link = document.createElement("link");
    link.id = "bp-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,500&family=Work+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------------------------------------------------------------------- */
/*  Root                                                                    */
/* ---------------------------------------------------------------------- */

export default function BlogPage() {
  useGoogleFonts();
  return (
    <div className="bp-root">
      <style>{CSS}</style>
      <Header />
      <br/>
      <br/>
      <br/>
      <LatestSection />
      <AllPostsSection />
      <ImageStrip />
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Styles — palette & type sourced from the kit's global.json             */
/* ---------------------------------------------------------------------- */

const CSS = `
:root{
  --paper:#F7F4ED;
  --card:#EAE2D0;
  --border:#D3CAB8;
  --olive:#75825C;
  --olive-dark:#5F694B;
  --ink:#120A02;
  --body:#49443C;
  --footer-bg:#2E2E2E;
}
.bp-root{
  background:var(--paper);
  color:var(--body);
  font-family:'Work Sans', sans-serif;
  -webkit-font-smoothing:antialiased;
}
.bp-root *{ box-sizing:border-box; }
.bp-root img{ display:block; max-width:100%; }
.bp-root a{ color:inherit; text-decoration:none; }
.bp-root button{ font-family:inherit; cursor:pointer; background:none; border:none; color:inherit; }
.bp-root h1,.bp-root h2,.bp-root h3{ font-family:'Cormorant', Georgia, serif; color:var(--ink); margin:0; font-weight:500; }

/* generic section */
.bp-section{ max-width:1180px; margin:0 auto; padding:64px 32px; }
.bp-h1{ font-size:clamp(30px,4vw,42px); margin-bottom:36px; }
.bp-h2{ font-size:clamp(26px,3.4vw,36px); text-align:center; margin-bottom:44px; }

/* card */
.bp-card{ display:flex; flex-direction:column; }
.bp-card-media{ display:block; border-radius:2px; overflow:hidden; aspect-ratio:1/1; margin-bottom:16px; }
.bp-card-media img{ width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
.bp-card:hover .bp-card-media img{ transform:scale(1.05); }
.bp-meta{ font-size:12.5px; color:var(--body); opacity:.75; margin:0 0 8px; }
.bp-dot{ opacity:.6; }
.bp-card-title{ font-size:19px; line-height:1.32; margin-bottom:12px; }
.bp-card-title a:hover{ color:var(--olive-dark); }
.bp-read-more{
  font-size:12px; letter-spacing:0.12em; font-weight:600; text-transform:uppercase;
  color:var(--ink); border-bottom:1px solid var(--ink); width:fit-content; padding-bottom:2px;
  transition:color .2s ease, border-color .2s ease;
}
.bp-read-more:hover{ color:var(--olive-dark); border-color:var(--olive-dark); }

/* hero bento grid */
.bp-hero-grid{
  display:grid;
  grid-template-columns:1fr 1fr 1.15fr;
  grid-template-rows:repeat(2,1fr);
  grid-template-areas:"a b c" "d e c";
  gap:32px 28px;
}
.bp-slot-a{ grid-area:a; } .bp-slot-b{ grid-area:b; }
.bp-slot-d{ grid-area:d; } .bp-slot-e{ grid-area:e; }
.bp-slot-c{ grid-area:c; display:flex; flex-direction:column; gap:24px; }

.bp-feature-big{
  position:relative; display:block; border-radius:2px; overflow:hidden;
  flex:1.7; min-height:220px;
}
.bp-feature-big img{ width:100%; height:100%; object-fit:cover; position:absolute; inset:0; transition:transform .6s ease; }
.bp-feature-big:hover img{ transform:scale(1.05); }
.bp-feature-overlay{
  position:relative; z-index:1; height:100%; display:flex; flex-direction:column; justify-content:flex-end;
  padding:24px; background:linear-gradient(180deg, rgba(18,10,2,0) 40%, rgba(18,10,2,0.82) 100%);
}
.bp-feature-overlay .bp-meta{ color:rgba(255,255,255,0.78); }
.bp-feature-overlay h3{ color:#fff; font-size:19px; line-height:1.32; }

.bp-newsletter-card{
  background:var(--card); border:1px solid var(--border); padding:28px 26px; flex:1;
  display:flex; flex-direction:column; gap:12px; justify-content:center;
}
.bp-newsletter-card h3{ font-size:21px; line-height:1.35; }
.bp-newsletter-card h3 em{ font-style:italic; color:var(--olive-dark); }
.bp-newsletter-card > p{ font-size:13px; color:var(--body); opacity:.8; margin:0; }
.bp-newsletter-card form{ display:flex; flex-direction:column; gap:10px; margin-top:6px; }
.bp-newsletter-card input{
  padding:13px 16px; border:1px solid var(--border); background:#fff; font-size:13.5px; color:var(--body);
}
.bp-newsletter-card input:focus{ outline:2px solid var(--olive); outline-offset:1px; }
.bp-newsletter-card button{
  background:var(--olive-dark); color:#fff; padding:13px 16px; font-size:12px;
  letter-spacing:0.14em; text-transform:uppercase; font-weight:600; transition:background .2s ease;
}
.bp-newsletter-card button:hover{ background:var(--ink); }

@media (max-width:900px){
  .bp-hero-grid{ grid-template-columns:1fr 1fr; grid-template-areas:"a b" "d e" "c c"; }
  .bp-slot-c{ flex-direction:row; }
  .bp-feature-big{ min-height:260px; }
}
@media (max-width:620px){
  .bp-hero-grid{ grid-template-columns:1fr; grid-template-areas:"a" "b" "d" "e" "c"; }
  .bp-slot-c{ flex-direction:column; }
}

/* all posts grid */
.bp-all-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:40px 28px; }
.bp-load-more{
  display:block; margin:48px auto 0; background:var(--olive-dark); color:#fff;
  padding:14px 34px; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; font-weight:600;
  transition:background .2s ease;
}
.bp-load-more:hover{ background:var(--ink); }
@media (max-width:900px){ .bp-all-grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:600px){ .bp-all-grid{ grid-template-columns:1fr; } }

/* gallery */
.bp-gallery{ display:grid; grid-template-columns:repeat(6,1fr); }
.bp-gallery-item{ display:block; aspect-ratio:4/5; overflow:hidden; }
.bp-gallery-item img{ width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
.bp-gallery-item:hover img{ transform:scale(1.06); }
@media (max-width:760px){ .bp-gallery{ grid-template-columns:repeat(3,1fr); } }
@media (max-width:460px){ .bp-gallery{ grid-template-columns:repeat(2,1fr); } }

`;