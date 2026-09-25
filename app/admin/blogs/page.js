"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Search, Pencil, Trash2, CalendarDays, Clock3, ChevronDown } from "lucide-react";
import { api, Spinner, EmptyState, Modal, Field, ConfirmDialog, useToast } from "@/components/Admin/ui";

const DEFAULT_CATEGORIES = ["Real Estate", "Leadership", "Business", "Market Insights", "Strategy", "Perspective"];

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const emptyForm = {
  slug: "",
  title: "",
  category: "Perspective",
  date: new Date().toISOString().slice(0, 10),
  readingTime: "5 min read",
  excerpt: "",
  coverImage: "",
  contentText: "",
};

export default function AdminBlogs() {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [expanded, setExpanded] = useState({});

  const load = () => {
    api("/api/blogs")
      .then((d) => {
        setBlogs(d.blogs || []);
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

  const categories = useMemo(
    () => ["All", ...new Set([...DEFAULT_CATEGORIES, ...blogs.map((b) => b.category).filter(Boolean)])],
    [blogs]
  );

  const filtered = blogs.filter((b) => {
    const inFilter = filter === "All" || b.category === filter;
    const hay = `${b.title} ${b.excerpt} ${b.category}`.toLowerCase();
    return inFilter && hay.includes(search.toLowerCase());
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (blog) => {
    setEditing(blog);
    setForm({
      slug: blog.slug,
      title: blog.title,
      category: blog.category || "Perspective",
      date: blog.date || new Date().toISOString().slice(0, 10),
      readingTime: blog.readingTime || "5 min read",
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      contentText: (blog.content || []).join("\n"),
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.contentText.trim()) {
      toast("Title and content are required", "error");
      return;
    }
    setSaving(true);
    const payload = {
      slug: editing ? form.slug || slugify(form.title) : slugify(form.title),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      readingTime: form.readingTime || "5 min read",
      excerpt: form.excerpt.trim(),
      coverImage: form.coverImage.trim() || null,
      content: form.contentText.split("\n").map((p) => p.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await api(`/api/blogs/${editing.slug}`, { method: "PATCH", body: JSON.stringify(payload) });
        toast("Blog updated");
      } else {
        await api("/api/blogs", { method: "POST", body: JSON.stringify(payload) });
        toast("Blog published");
      }
      setModalOpen(false);
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await api(`/api/blogs/${deleting.slug}`, { method: "DELETE" });
      toast("Blog deleted");
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
          <h2 className="adm-section-title">Blog Publications</h2>
          <p className="adm-section-sub" style={{ marginBottom: 0 }}>
            Write, edit and curate the perspectives readers see on the site.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}>
          <Plus size={15} /> New Blog
        </button>
      </div>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "20px" }}>
        <div className="adm-chips">
          {categories.map((c) => (
            <button key={c} className={`adm-chip ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="adm-search" style={{ minWidth: "240px" }}>
          <Search size={15} />
          <input placeholder="Search publications..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<FileText size={28} />} title="No publications found" sub="Create your first blog post to get started." />
      ) : (
        <div className="adm-card" style={{ padding: "6px 20px" }}>
          <div className="adm-list">
            <AnimatePresence initial={false}>
              {filtered.map((blog, i) => {
                const isOpen = expanded[blog.slug];
                return (
                  <motion.div
                    key={blog.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="adm-row" style={{ cursor: "pointer", padding: "16px 4px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "rgba(184,112,66,0.12)",
                          color: "#b87042",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                        onClick={() => setExpanded((e) => ({ ...e, [blog.slug]: !isOpen }))}
                      >
                        <FileText size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }} onClick={() => setExpanded((e) => ({ ...e, [blog.slug]: !isOpen }))}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: "700", fontSize: "0.95rem", color: "#211c16" }}>{blog.title}</span>
                          <span className="adm-pill adm-pill-new" style={{ textTransform: "none" }}>{blog.category}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#877b6c", display: "flex", gap: "14px", marginTop: "3px", flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <CalendarDays size={12} /> {blog.date || "—"}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <Clock3 size={12} /> {blog.readingTime || "5 min read"}
                          </span>
                          <span>· {blog.content?.length || 0} sections</span>
                        </div>
                      </div>
                      <button
                        className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={() => setExpanded((e) => ({ ...e, [blog.slug]: !isOpen }))}
                        aria-label="Toggle details"
                      >
                        <ChevronDown size={15} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                      </button>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => openEdit(blog)} aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setDeleting(blog)} aria-label="Delete">
                        <Trash2 size={14} />
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
                          <div className="adm-expand" style={{ padding: "4px 4px 16px 60px", borderBottom: "1px solid var(--adm-line)" }}>
                            <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#5c5347", lineHeight: "1.6" }}>
                              {blog.excerpt || "No excerpt provided."}
                            </p>
                            <div style={{ fontSize: "0.76rem", color: "#a09080" }}>
                              /blogs/{blog.slug} · {(blog.content || []).length} sections · first section: {(blog.content || [])[0]?.slice(0, 90) || "—"}
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

      {/* Create / Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Publication" : "New Publication"} wide>
        <Field label="Title *">
          <input
            className="adm-input"
            placeholder="The Discipline Behind Real Estate Growth"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
          />
        </Field>
        <div className="adm-grid-form">
          <Field label="Slug">
            <input className="adm-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} placeholder="auto-generated" disabled={!editing && !form.title} />
          </Field>
          <Field label="Category">
            <select className="adm-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["Perspective", ...DEFAULT_CATEGORIES].filter((c, idx, arr) => arr.indexOf(c) === idx).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="adm-grid-form">
          <Field label="Publish Date">
            <input className="adm-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Reading Time">
            <input className="adm-input" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: e.target.value })} placeholder="5 min read" />
          </Field>
        </div>
        <Field label="Cover Image URL (optional)">
          <input className="adm-input" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="https://… or /images/…" />
        </Field>
        <Field label="Excerpt / Summary">
          <textarea className="adm-textarea" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="A short hook shown on cards and in search results." />
        </Field>
        <Field label="Body *" hint="One paragraph per line.">
          <textarea
            className="adm-textarea"
            rows={8}
            value={form.contentText}
            onChange={(e) => setForm({ ...form, contentText: e.target.value })}
            placeholder={"First paragraph…\n\nSecond paragraph…"}
          />
        </Field>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "6px" }}>
          <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <Spinner /> : null}
            {editing ? "Save Changes" : "Publish Blog"}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete publication?"
        message={`"${deleting?.title}" will be removed from the site permanently.`}
        busy={deleteBusy}
      />
    </motion.div>
  );
}