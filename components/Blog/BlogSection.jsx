"use client";

import React from "react";
import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    title: "Bridging the Gap Between Education and Industry",
    description:
      "Exploring actionable frameworks where academia aligns directly with corporate demands, empowering graduates with actual execution skills rather than just theoretical paradigms across expanding sectors.",
    date: "Sep 12, 2026",
    image: "/images/blogs/ireed-events/17.png",
    slug: "bridging-the-gap-between-education-and-industry",
  },
  {
    title: "Skills That Matter in the Evolving Job Market",
    description:
      "A deep dive into essential strategic competencies, cross-domain execution, and leadership faculties required to stay resilient against technological disruptions in modern enterprise structures.",
    date: "Aug 28, 2026",
    image: "/images/blogs/ireed-events/18.png",
    slug: "skills-that-matter-in-the-evolving-job-market",
  },
  {
    title: "Building Meaningful Industry Partnerships",
    description:
      "Strategic insights on structuring high-yield institutional alliances, collaborative venture models, and executive networks that drive measurable value for students and corporations alike.",
    date: "Aug 10, 2026",
    image: "/images/blogs/ireed-events/05.png",
    slug: "building-meaningful-industry-partnerships",
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      style={{
        backgroundColor: "#f7f4ee",
        padding: "5rem 0",
        color: "#1c1917",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#8a7e72",
                fontWeight: "700",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Latest Insights
            </span>
            <h2
              style={{
                fontSize: "2.6rem",
                fontFamily: "serif",
                margin: 0,
                color: "#1c1917",
              }}
            >
              From the Blog
            </h2>
          </div>

          <a
            href="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.88rem",
              fontWeight: "600",
              color: "#1c1917",
              textDecoration: "none",
              borderBottom: "1.5px solid #1c1917",
              paddingBottom: "2px",
            }}
          >
            View All Articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(184, 112, 66, 0.16)",
                boxShadow: "0 10px 28px -8px rgba(66, 44, 28, 0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card Image */}
              <div style={{ height: "220px", width: "100%", overflow: "hidden", position: "relative" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
                
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#8a7e72",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  {post.date}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.22rem",
                    lineHeight: "1.35",
                    margin: "0 0 10px 0",
                    color: "#1c1917",
                  }}
                >
                  {post.title}
                </h3>

                {/* 3-Line Paragraph (CSS line-clamp) */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: "1.55",
                    color: "#685f54",
                    margin: "0 0 20px 0",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.description}
                </p>

                {/* Read More Action Button */}
                <div
                  style={{
                    borderTop: "1px solid #f2ebe1",
                    paddingTop: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <a
                    href={`/blogs/${post.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.84rem",
                      fontWeight: "700",
                      color: "#b87042",
                      textDecoration: "none",
                      transition: "gap 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "9px")}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
                  >
                    Read More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>

                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#f7f1e8",
                      color: "#b87042",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BlogSection;