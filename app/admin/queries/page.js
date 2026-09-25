"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Search, Trash2, MailOpen, Mail, Archive, ChevronDown, Send } from "lucide-react";
import { api, Spinner, EmptyState, ConfirmDialog, useToast } from "@/components/Admin/ui";

function formatWhen(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `Today, ${time}`;
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${date}, ${time}`;
}

const FILTERS = [
  { label: "All", value: "All" },
  { label: "New", value: "new" },
  { label: "Read", value: "read" },
  { label: "Archived", value: "archived" },
];

export default function AdminQueries() {
  const toast = useToast();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = () => {
    api("/api/queries")
      .then((d) => {
        const sorted = [...(d.queries || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sorted);
        setLoading(false);
      })
      .catch((e) => {
        toast(e.message, "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    return queries.filter((q) => {
      const inFilter = filter === "All" || q.status === filter;
      const hay = `${q.name} ${q.email} ${q.subject} ${q.message}`.toLowerCase();
      return inFilter && hay.includes(search.toLowerCase());
    });
  }, [queries, filter, search]);

  const counts = useMemo(() => {
    const c = { All: queries.length, new: 0, read: 0, archived: 0 };
    queries.forEach((q) => {
      if (c[q.status] !== undefined) c[q.status] += 1;
    });
    return c;
  }, [queries]);

  const setStatus = async (q, status, label = "Updated") => {
    try {
      await api(`/api/queries/${q.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast(`${label} — ${q.name}`);
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await api(`/api/queries/${deleting.id}`, { method: "DELETE" });
      toast("Inquiry deleted");
      setDeleting(null);
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap", marginBottom: "22px" }}>
        <div>
          <h2 className="adm-section-title">Inquiries</h2>
          <p className="adm-section-sub" style={{ marginBottom: 0 }}>
            Every submission from the contact page lands here in real time.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={load}>
          <Send size={14} /> Refresh
        </button>
      </div>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "20px" }}>
        <div className="adm-chips">
          {FILTERS.map((f) => (
            <button key={f.value} className={`adm-chip ${filter === f.value ? "active" : ""}`} onClick={() => setFilter(f.value)}>
              {f.label}
              <span style={{ opacity: 0.65, marginLeft: "4px", fontSize: "0.74rem" }}>{counts[f.value] || 0}</span>
            </button>
          ))}
        </div>
        <div className="adm-search" style={{ minWidth: "240px" }}>
          <Search size={15} />
          <input placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Inbox size={28} />} title="No inquiries match" sub="New messages from the contact page will appear here." />
      ) : (
        <div className="adm-card" style={{ padding: "6px 20px" }}>
          <div className="adm-list">
            <AnimatePresence initial={false}>
              {filtered.map((q) => {
                const isOpen = expanded[q.id];
                const isNew = q.status === "new";
                return (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="adm-row"
                      style={{
                        cursor: "pointer",
                        padding: "16px 4px",
                        background: isNew ? "linear-gradient(90deg, rgba(184,112,66,0.05), transparent)" : "none",
                      }}
                      onClick={() => setExpanded((e) => ({ ...e, [q.id]: !isOpen }))}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: isNew ? "rgba(184,112,66,0.14)" : "rgba(23,19,16,0.06)",
                          color: isNew ? "#b87042" : "#877b6c",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontWeight: "800",
                          fontSize: "0.95rem",
                        }}
                      >
                        {q.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "700", fontSize: "0.94rem", color: "#211c16" }}>{q.name}</span>
                          <span className={`adm-pill ${isNew ? "adm-pill-new" : "adm-pill-read"}`}>{q.status}</span>
                          <span style={{ fontSize: "0.84rem", color: "#8a7e72", fontWeight: "500" }}>{q.email}</span>
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "#877b6c", marginTop: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: isOpen ? "normal" : "nowrap", lineHeight: "1.5" }}>
                          <span style={{ fontWeight: "600", color: "#b87042" }}>{q.subject}</span>
                          {" · "}{q.message}
                        </div>
                      </div>
                      <div className="adm-when" style={{ fontSize: "0.76rem", color: "#a09080", flexShrink: 0, textAlign: "right" }}>
                        {formatWhen(q.createdAt)}
                      </div>
                      <button
                        className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded((s) => ({ ...s, [q.id]: !isOpen }));
                        }}
                        aria-label="Expand"
                      >
                        <ChevronDown size={15} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="adm-expand" style={{ padding: "4px 4px 18px 64px", borderBottom: "1px solid var(--adm-line)" }}>
                            <p style={{ margin: "0 0 16px", fontSize: "0.95rem", color: "#3c342c", lineHeight: "1.75", whiteSpace: "pre-wrap" }}>
                              {q.message}
                            </p>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              {q.status !== "read" && (
                                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setStatus(q, "read", "Marked as read")}>
                                  <MailOpen size={13} /> Mark read
                                </button>
                              )}
                              {q.status !== "new" && (
                                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setStatus(q, "new", "Marked as new")}>
                                  <Mail size={13} /> Mark new
                                </button>
                              )}
                              {q.status !== "archived" && (
                                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setStatus(q, "archived", "Archived")}>
                                  <Archive size={13} /> Archive
                                </button>
                              )}
                              <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setDeleting(q)}>
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete inquiry?"
        message={`The inquiry from "${deleting?.name}" (${deleting?.email}) will be permanently removed.`}
        busy={deleteBusy}
      />
    </motion.div>
  );
}