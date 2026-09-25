"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  Inbox,
  Mail,
  Plus,
  ArrowRight,
  ExternalLink,
  Clock,
} from "lucide-react";
import { api, Spinner, EmptyState } from "@/components/Admin/ui";

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminOverview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/stats")
      .then((d) => setData(d))
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <div className="adm-empty">Failed to load stats: {error}</div>;
  }

  if (!data) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "6rem 0" }}>
        <Spinner />
      </div>
    );
  }

  const { stats, recent } = data;

  const cards = [
    { label: "Published Blogs", value: stats.blogs, icon: FileText, color: "#b87042", href: "/admin/blogs" },
    { label: "Gallery Frames", value: stats.gallery, icon: FolderOpen, color: "#8a6f46", href: "/admin/gallery" },
    { label: "Total Queries", value: stats.queries, icon: Inbox, color: "#5b7f6b", href: "/admin/queries" },
    { label: "Unread / New", value: stats.unreadQueries, icon: Mail, color: "#c05656", href: "/admin/queries" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="adm-card" style={{ marginBottom: "22px", background: "linear-gradient(120deg, #171310, #241c14)", color: "#f5efe6", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "2px", color: "#c98a58", fontWeight: "700", marginBottom: "8px" }}>
              Executive Control Room
            </div>
            <h2 className="adm-serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0 0 6px 0", fontWeight: "600" }}>
              Everything in one place.
            </h2>
            <p style={{ margin: 0, color: "rgba(245,239,230,0.65)", fontSize: "0.92rem" }}>
              Manage content, respond to inquiries and curate the gallery — all live.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/admin/blogs" className="adm-btn adm-btn-gold">
              <Plus size={15} /> New Blog
            </Link>
            <Link href="/admin/gallery" className="adm-btn" style={{ background: "rgba(245,239,230,0.1)", color: "#f5efe6" }}>
              <Plus size={15} /> Add Frame
            </Link>
          </div>
        </div>
      </div>

      <div className="adm-grid adm-grid-4" style={{ marginBottom: "22px" }}>
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="adm-stat"
            >
              <div className="adm-stat-head">
                <div className="adm-stat-icon">
                  <Icon size={19} />
                </div>
                <Link href={card.href} style={{ color: "#b87042", display: "inline-flex" }} aria-label={`Open ${card.label}`}>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="adm-stat-num">{card.value}</div>
              <div className="adm-stat-label">{card.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="adm-grid adm-split">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="adm-card"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <h3 className="adm-serif" style={{ fontSize: "1.15rem", margin: 0 }}>Recent Inquiries</h3>
            <Link href="/admin/queries" style={{ fontSize: "0.82rem", fontWeight: "700", color: "#b87042", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <div className="adm-list" style={{ marginTop: "8px" }}>
            {recent.length === 0 ? (
              <EmptyState
                icon={<Inbox size={28} />}
                title="No inquiries yet"
                sub="Submissions from the contact page will appear here."
              />
            ) : (
              recent.map((q) => (
                <div key={q.id} className="adm-row" style={{ padding: "12px 0" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "11px",
                      background: "rgba(184,112,66,0.12)",
                      color: "#b87042",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    {q.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "#211c16" }}>{q.name}</span>
                      <span className={`adm-pill ${q.status === "new" ? "adm-pill-new" : "adm-pill-read"}`}>{q.status}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#877b6c", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {q.subject} · {q.message}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#a09080", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                    <Clock size={12} />
                    {timeAgo(q.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className="adm-card"
        >
          <h3 className="adm-serif" style={{ fontSize: "1.15rem", margin: "0 0 14px 0" }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Write a new blog post", href: "/admin/blogs", icon: FileText },
              { label: "Add photos to the gallery", href: "/admin/gallery", icon: FolderOpen },
              { label: "Check new inquiries", href: "/admin/queries", icon: Inbox },
              { label: "Preview the live gallery", href: "/gallery", icon: ExternalLink, external: true },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  target={a.external ? "_blank" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 14px",
                    borderRadius: "13px",
                    border: "1px solid var(--adm-line)",
                    background: "#fcfbf8",
                    textDecoration: "none",
                    color: "#211c16",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(184,112,66,0.4)";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--adm-line)";
                    e.currentTarget.style.background = "#fcfbf8";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(184,112,66,0.1)",
                      color: "#b87042",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: "600", flex: 1 }}>{a.label}</span>
                  <ArrowRight size={15} color="#c4b8a8" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}