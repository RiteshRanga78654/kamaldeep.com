"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BlogsExplorer({ posts = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Normalize categories with 'All'
  const categoryList = ["All", ...categories.map((c) => (typeof c === "string" ? c : c.name || c.title))];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory ||
      (post.tags && post.tags.includes(selectedCategory));

    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];
  const gridPosts = selectedCategory === "All" && !searchQuery ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div style={{ paddingTop: "7.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* HERO SECTION: Editorial Header */}
        <div style={{ marginBottom: "4rem", maxWidth: "900px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#b87042" }} />
            <span
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                color: "#8a7e72",
                fontWeight: "700",
              }}
            >
              Intelligence &amp; Perspectives
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontFamily: "serif",
              lineHeight: "1.12",
              letterSpacing: "-0.8px",
              color: "#1c1917",
              margin: 0,
            }}
          >
            Insights on real estate, executive strategy &amp; market scale.
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.1rem",
              lineHeight: "1.65",
              color: "#6b6257",
              maxWidth: "680px",
            }}
          >
            Reflections from the intersection of industry alliances, education design, and institutional real estate — tailored for leaders driving market evolution.
          </p>

          {/* Quick Metrics */}
          <div style={{ display: "flex", gap: "28px", marginTop: "2rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "1.5rem", fontFamily: "serif", fontWeight: "700", color: "#b87042" }}>
                {posts.length}+
              </span>
              <span style={{ display: "block", fontSize: "0.78rem", color: "#8a7e72", textTransform: "uppercase", letterSpacing: "1px" }}>
                Published Editions
              </span>
            </div>
            <div style={{ width: "1px", backgroundColor: "rgba(28,25,23,0.1)" }} />
            <div>
              <span style={{ fontSize: "1.5rem", fontFamily: "serif", fontWeight: "700", color: "#b87042" }}>
                {categories.length || 4}
              </span>
              <span style={{ display: "block", fontSize: "0.78rem", color: "#8a7e72", textTransform: "uppercase", letterSpacing: "1px" }}>
                Strategic Domains
              </span>
            </div>
          </div>
        </div>

        {/* LEAD FEATURED ARTICLE (Only when 'All' is selected and no active search) */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              border: "1px solid rgba(184, 112, 66, 0.18)",
              overflow: "hidden",
              boxShadow: "0 20px 40px -15px rgba(66, 44, 28, 0.08)",
              marginBottom: "4.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Image Box */}
            <div style={{ position: "relative", minHeight: "360px", overflow: "hidden" }}>
              <img
                src={featuredPost.coverImage || featuredPost.image || "/images/blogs/ireed-events/13.png"}
                alt={featuredPost.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  backgroundColor: "rgba(23, 20, 18, 0.85)",
                  backdropFilter: "blur(6px)",
                  color: "#f5efe6",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Lead Insight
              </div>
            </div>

            {/* Content Box */}
            <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#b87042", textTransform: "uppercase" }}>
                  {featuredPost.category || "Real Estate Strategy"}
                </span>
                <span style={{ color: "#c4b8aa" }}>•</span>
                <span style={{ fontSize: "0.82rem", color: "#8a7e72" }}>
                  {featuredPost.readTime || "5 min read"}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  lineHeight: "1.25",
                  margin: "0 0 16px 0",
                  color: "#1c1917",
                }}
              >
                <a
                  href={`/blogs/${featuredPost.slug || "#"}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {featuredPost.title}
                </a>
              </h2>

              <p style={{ color: "#6b6257", fontSize: "0.96rem", lineHeight: "1.6", margin: "0 0 24px 0" }}>
                {featuredPost.excerpt || featuredPost.description}
              </p>

              <div>
                <a
                  href={`/blogs/${featuredPost.slug || "#"}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "700",
                    fontSize: "0.88rem",
                    color: "#1c1917",
                    textDecoration: "none",
                    borderBottom: "1.5px solid #1c1917",
                    paddingBottom: "2px",
                  }}
                >
                  Read Full Publication
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTROLS BAR: Category Filter Pills + Search Field */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(28, 25, 23, 0.08)",
          }}
        >
          {/* Category Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categoryList.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    border: "none",
                    background: isSelected ? "#1c1917" : "#ede7dd",
                    color: isSelected ? "#f5efe6" : "#685e51",
                    padding: "8px 18px",
                    borderRadius: "24px",
                    fontSize: "0.84rem",
                    fontWeight: isSelected ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Search perspectives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 16px 9px 38px",
                borderRadius: "20px",
                border: "1px solid rgba(28, 25, 23, 0.15)",
                backgroundColor: "#ffffff",
                fontSize: "0.85rem",
                outline: "none",
                color: "#1c1917",
              }}
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a7e72"
              strokeWidth="2.2"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <AnimatePresence mode="popLayout">
          {gridPosts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "2.5rem 2rem",
              }}
            >
              {gridPosts.map((post) => (
                <motion.article
                  key={post.id || post.slug || post.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(28, 25, 23, 0.08)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Card Media */}
                  <div style={{ height: "210px", width: "100%", overflow: "hidden", position: "relative" }}>
                    <img
                      src={post.coverImage || post.image || "/images/blogs/ireed-events/14.png"}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: "700",
                          color: "#b87042",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {post.category || "Perspective"}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#8a7e72" }}>
                        {post.readTime || "4 min read"}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "serif",
                        fontSize: "1.25rem",
                        lineHeight: "1.35",
                        margin: "0 0 10px 0",
                        color: "#1c1917",
                      }}
                    >
                      <a href={`/blogs/${post.slug || "#"}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {post.title}
                      </a>
                    </h3>

                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "#6b6257",
                        lineHeight: "1.55",
                        margin: "0 0 20px 0",
                        flex: 1,
                      }}
                    >
                      {post.excerpt || post.description}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0ebe1", paddingTop: "14px" }}>
                      <span style={{ fontSize: "0.78rem", color: "#94897d" }}>
                        {post.date || "Recent Edition"}
                      </span>
                      <a
                        href={`/blogs/${post.slug || "#"}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.82rem",
                          fontWeight: "700",
                          color: "#1c1917",
                          textDecoration: "none",
                        }}
                      >
                        Read
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#8a7e72" }}>
              <h3 style={{ fontFamily: "serif", fontSize: "1.4rem", color: "#1c1917" }}>No perspectives found</h3>
              <p style={{ fontSize: "0.9rem" }}>Try clearing your search query or selecting another category.</p>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}