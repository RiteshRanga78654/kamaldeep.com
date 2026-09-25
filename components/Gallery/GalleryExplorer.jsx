"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Image as ImageIcon,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";

function formatLabel(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function GalleryExplorer({ items = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const searchRef = useRef(null);

  const categoryList = ["All", ...categories.filter((c) => c !== "All")];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const inCategory = activeCategory === "All" || item.category === activeCategory;
      const haystack = [item.title, item.caption, item.category, ...(item.tags || [])]
        .join(" ")
        .toLowerCase();
      return inCategory && haystack.includes(searchQuery.toLowerCase());
    });
  }, [items, activeCategory, searchQuery]);

  const featured = filtered.find((f) => f.featured) || filtered[0];
  const rest = featured ? filtered.filter((f) => f.id !== featured.id) : [];

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const step = (dir) => {
    setSelectedIndex((current) => {
      if (current === null) return current;
      return (current + dir + filtered.length) % filtered.length;
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((c) => (c === null ? c : (c - 1 + filtered.length) % filtered.length));
      if (e.key === "ArrowRight") setSelectedIndex((c) => (c === null ? c : (c + 1) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length]);

  return (
    <div style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ============ HERO ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "3.5rem", maxWidth: "900px" }}
        >
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
              Visual Archive
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontFamily: "Georgia, serif",
              lineHeight: "1.12",
              letterSpacing: "-0.8px",
              color: "#1c1917",
              margin: 0,
            }}
          >
            Moments that shaped the work.
          </h1>

          <p
            style={{
              marginTop: "1.2rem",
              fontSize: "1.08rem",
              lineHeight: "1.65",
              color: "#6b6257",
              maxWidth: "640px",
            }}
          >
            Summits, keynotes, studios and field engagements — a living archive curated from
            leadership travels and institutional partnerships.
          </p>

          <div style={{ display: "flex", gap: "28px", marginTop: "2rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "1.5rem", fontFamily: "Georgia, serif", fontWeight: "700", color: "#b87042" }}>
                {items.length}
              </span>
              <span style={{ display: "block", fontSize: "0.78rem", color: "#8a7e72", textTransform: "uppercase", letterSpacing: "1px" }}>
                Featured Frames
              </span>
            </div>
            <div style={{ width: "1px", backgroundColor: "rgba(28,25,23,0.1)" }} />
            <div>
              <span style={{ fontSize: "1.5rem", fontFamily: "Georgia, serif", fontWeight: "700", color: "#b87042" }}>
                {categories.length - 1 || 0}
              </span>
              <span style={{ display: "block", fontSize: "0.78rem", color: "#8a7e72", textTransform: "uppercase", letterSpacing: "1px" }}>
                Visual Papers
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============ CONTROLS ============ */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(28, 25, 23, 0.08)",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <SlidersHorizontal size={14} color="#8a7e72" style={{ marginRight: "2px" }} />
            {categoryList.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {cat}
                  {isSelected && <Sparkles size={12} />}
                </motion.button>
              );
            })}
          </div>

          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search
              size={14}
              color="#8a7e72"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search the archive..."
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
          </div>
        </div>

        {/* ============ FEATURED FRAME ============ */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              border: "1px solid rgba(184, 112, 66, 0.18)",
              overflow: "hidden",
              boxShadow: "0 20px 40px -15px rgba(66, 44, 28, 0.08)",
            }}
          >
            <motion.button
              onClick={() => openLightbox(filtered.indexOf(featured))}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                minHeight: "380px",
                overflow: "hidden",
                padding: 0,
                border: "none",
                cursor: "zoom-in",
                background: "#eee7db",
              }}
            >
              <img
                src={featured.src}
                alt={featured.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LayoutGrid size={12} />
                Signature Frame
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "16px",
                  bottom: "16px",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(247,244,238,0.9)",
                  color: "#1c1917",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Maximize2 size={16} />
              </div>
            </motion.button>

            <div style={{ padding: "38px 34px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#b87042", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {featured.category || "Gallery"}
                </span>
                <span style={{ color: "#c4b8aa" }}>•</span>
                <span style={{ fontSize: "0.82rem", color: "#8a7e72" }}>{formatLabel(featured.createdAt)}</span>
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
                  lineHeight: "1.22",
                  margin: "0 0 14px 0",
                  color: "#1c1917",
                }}
              >
                {featured.title}
              </h2>
              {featured.caption && (
                <p style={{ color: "#6b6257", fontSize: "0.98rem", lineHeight: "1.65", margin: "0 0 20px 0" }}>
                  {featured.caption}
                </p>
              )}
              {featured.tags?.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#f3eddf",
                        color: "#8a6f46",
                        fontSize: "0.72rem",
                        fontWeight: "600",
                        padding: "5px 12px",
                        borderRadius: "100px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ============ MASONRY GRID ============ */}
        <AnimatePresence mode="popLayout">
          {rest.length > 0 ? (
            <div className="gallery-columns" style={{ columnCount: 3, columnGap: "1.4rem", position: "relative" }}>
              {rest.map((item, i) => (
                <motion.figure
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    breakInside: "avoid",
                    margin: "0 0 1.4rem 0",
                    borderRadius: "18px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(28, 25, 23, 0.08)",
                    boxShadow: "0 8px 22px rgba(0, 0, 0, 0.03)",
                    cursor: "zoom-in",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => openLightbox(filtered.indexOf(item))}
                    aria-label={`Open ${item.title}`}
                    style={{ padding: 0, border: "none", background: "none", cursor: "inherit", display: "block", width: "100%" }}
                  >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          display: "block",
                          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(20,17,12,0) 40%, rgba(20,17,12,0.72) 100%)",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          padding: "18px",
                          color: "#f5efe6",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                      >
                        <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1.4px", color: "#e3a774", marginBottom: "4px" }}>
                          {item.category || "Gallery"}
                        </span>
                        <span style={{ fontSize: "0.98rem", fontWeight: "700", fontFamily: "Georgia, serif" }}>
                          {item.title}
                        </span>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "rgba(247,244,238,0.88)",
                          color: "#1c1917",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                      >
                        <Maximize2 size={13} />
                      </div>
                    </div>
                  </button>
                  {item.caption && (
                    <figcaption style={{ padding: "12px 16px 14px", fontSize: "0.82rem", color: "#8a7e72", lineHeight: "1.55" }}>
                      {item.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: "center",
                padding: "5rem 1rem",
                border: "1px dashed rgba(28,25,23,0.15)",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.5)",
                color: "#8a7e72",
              }}
            >
              <ImageIcon size={34} style={{ margin: "0 auto 1rem auto", color: "#c4b8aa" }} />
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1c1917", margin: "0 0 6px 0" }}>
                No frames match
              </h3>
              <p style={{ fontSize: "0.9rem", margin: 0 }}>
                Try clearing your search or picking another visual paper.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============ LIGHTBOX ============ */}
      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(16, 13, 10, 0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.button
              onClick={closeLightbox}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "22px",
                right: "22px",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "1px solid rgba(245,239,230,0.25)",
                background: "rgba(245,239,230,0.08)",
                color: "#f5efe6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <X size={20} />
            </motion.button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(245,239,230,0.12)",
                color: "#f5efe6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              style={{
                position: "absolute",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(245,239,230,0.12)",
                color: "#f5efe6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <ChevronRight size={22} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "1080px",
                width: "100%",
                maxHeight: "88vh",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <motion.div
                key={filtered[selectedIndex].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: 1, minHeight: 0, overflow: "hidden", borderRadius: "18px" }}
              >
                <img
                  src={filtered[selectedIndex].src}
                  alt={filtered[selectedIndex].title}
                  style={{ width: "100%", height: "100%", maxHeight: "76vh", objectFit: "contain" }}
                />
              </motion.div>

              <motion.div
                key={`meta-${filtered[selectedIndex].id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                style={{ color: "#f5efe6", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#e3a774", textTransform: "uppercase", letterSpacing: "1.4px" }}>
                      {filtered[selectedIndex].category || "Gallery"}
                    </span>
                    <span style={{ color: "rgba(245,239,230,0.35)", fontSize: "0.8rem" }}>
                      {selectedIndex + 1} / {filtered.length}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "1.5rem" }}>
                    {filtered[selectedIndex].title}
                  </h3>
                  {filtered[selectedIndex].caption && (
                    <p style={{ margin: "6px 0 0", fontSize: "0.92rem", color: "rgba(245,239,230,0.75)", maxWidth: "560px", lineHeight: "1.55" }}>
                      {filtered[selectedIndex].caption}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Camera size={14} color="#e3a774" />
                  <span style={{ fontSize: "0.82rem", color: "rgba(245,239,230,0.7)" }}>
                    {formatLabel(filtered[selectedIndex].createdAt) || "Archive"}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* responsive columns */}
      <style>{`
        @media (max-width: 900px){
          .gallery-columns { columnCount: 2 !important; }
        }
        @media (max-width: 600px){
          .gallery-columns { columnCount: 1 !important; }
        }
      `}</style>
    </div>
  );
}