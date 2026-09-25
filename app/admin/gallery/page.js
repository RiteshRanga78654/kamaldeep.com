"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Plus, Search, Pencil, Trash2, Star, UploadCloud, Link2 } from "lucide-react";
import { api, Spinner, EmptyState, Modal, Field, ConfirmDialog, useToast } from "@/components/Admin/ui";

const emptyForm = {
  src: "",
  title: "",
  caption: "",
  category: "General",
  tagsText: "",
  featured: false,
};

export default function AdminGallery() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = () => {
    api("/api/gallery")
      .then((d) => {
        setItems(d.gallery || []);
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
    () => ["All", ...new Set(items.map((g) => g.category).filter(Boolean))],
    [items]
  );

  const filtered = items.filter((g) => {
    const inFilter = filter === "All" || g.category === filter;
    const hay = `${g.title} ${g.caption} ${g.category} ${(g.tags || []).join(" ")}`.toLowerCase();
    return inFilter && hay.includes(search.toLowerCase());
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      src: item.src,
      title: item.title,
      caption: item.caption || "",
      category: item.category || "General",
      tagsText: (item.tags || []).join(", "),
      featured: Boolean(item.featured),
    });
    setModalOpen(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api("/api/upload", { method: "POST", body: fd });
      setForm((f) => ({ ...f, src: res.url }));
      toast("Image uploaded");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!form.src.trim()) {
      toast("Add an image URL or upload a file", "error");
      return;
    }
    setSaving(true);
    const payload = {
      src: form.src.trim(),
      title: form.title.trim() || "Untitled",
      caption: form.caption.trim(),
      category: form.category.trim() || "General",
      tags: form.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      featured: Boolean(form.featured),
    };
    try {
      if (editing) {
        await api(`/api/gallery/${editing.id}`, { method: "PATCH", body: JSON.stringify(payload) });
        toast("Frame updated");
      } else {
        await api("/api/gallery", { method: "POST", body: JSON.stringify(payload) });
        toast("Frame added to the gallery");
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
      await api(`/api/gallery/${deleting.id}`, { method: "DELETE" });
      toast("Frame removed");
      setDeleting(null);
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setDeleteBusy(false);
    }
  };

  const toggleFeatured = async (item) => {
    try {
      await api(`/api/gallery/${item.id}`, { method: "PATCH", body: JSON.stringify({ featured: !item.featured }) });
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", flexWrap: "wrap", marginBottom: "22px" }}>
        <div>
          <h2 className="adm-section-title">Gallery Frames</h2>
          <p className="adm-section-sub" style={{ marginBottom: 0 }}>
            Curate the visual archive shown on the public gallery page.
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={openCreate}>
          <Plus size={15} /> Add Frame
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
          <input placeholder="Search frames..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "5rem 0" }}>
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<FolderOpen size={28} />} title="No frames yet" sub="Upload photos or paste image URLs to build the gallery." />
      ) : (
        <div className="adm-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          <AnimatePresence initial={false}>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="adm-card"
                style={{ padding: 0, overflow: "hidden", position: "relative" }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#efe9dc" }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {item.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(184,112,66,0.92)",
                        color: "#fff",
                        fontSize: "0.68rem",
                        fontWeight: "700",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Star size={10} fill="currentColor" /> Signature
                    </div>
                  )}
                </div>
                <div style={{ padding: "12px 14px 14px" }}>
                  <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "#211c16", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#877b6c", marginBottom: "10px" }}>
                    {item.category} · {item.tags?.length || 0} tags
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="adm-btn adm-btn-ghost adm-btn-sm"
                      onClick={() => toggleFeatured(item)}
                      title={item.featured ? "Unset signature frame" : "Set as signature frame"}
                    >
                      <Star size={13} fill={item.featured ? "#b87042" : "none"} color={item.featured ? "#b87042" : "#877b6c"} />
                    </button>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => openEdit(item)} title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => setDeleting(item)} title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create / Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Frame" : "Add Frame"} wide>
        {form.src && (
          <div
            style={{
              marginBottom: "18px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--adm-line)",
              aspectRatio: "16/9",
              background: "#efe9dc",
            }}
          >
            <img src={form.src} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        )}
        <div className="adm-grid-form-lg" style={{ marginBottom: "6px" }}>
          <div>
            <Field label="Image URL">
              <div style={{ position: "relative" }}>
                <Link2 size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a09080" }} />
                <input
                  className="adm-input"
                  style={{ paddingLeft: "34px" }}
                  value={form.src}
                  onChange={(e) => setForm({ ...form, src: e.target.value })}
                  placeholder="https://… or /images/…"
                />
              </div>
            </Field>
          </div>
          <Field label={uploading ? "Uploading…" : "Or upload a file"}>
            <label
              className="adm-btn adm-btn-ghost"
              style={{
                width: "100%",
                justifyContent: "center",
                cursor: uploading ? "wait" : "pointer",
                border: "1px dashed rgba(23,19,16,0.25)",
                padding: "10px",
              }}
            >
              {uploading ? <Spinner /> : <UploadCloud size={15} />}
              {uploading ? "Uploading…" : "Choose image"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} disabled={uploading} />
            </label>
          </Field>
        </div>
        <div className="adm-grid-form">
          <Field label="Title">
            <input className="adm-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Summit Address" />
          </Field>
          <Field label="Category">
            <input className="adm-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Events" list="gallery-categories" />
            <datalist id="gallery-categories">
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
        </div>
        <Field label="Caption">
          <textarea className="adm-textarea" rows={2} value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="A short line shown under the frame." />
        </Field>
        <Field label="Tags" hint="Comma separated. Example: Summit, Leadership">
          <input className="adm-input" value={form.tagsText} onChange={(e) => setForm({ ...form, tagsText: e.target.value })} placeholder="Summit, Leadership" />
        </Field>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0 18px" }}>
          <input
            type="checkbox"
            id="featured-toggle"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            style={{ width: "17px", height: "17px", accentColor: "#b87042", cursor: "pointer" }}
          />
          <label htmlFor="featured-toggle" style={{ fontSize: "0.86rem", fontWeight: "600", color: "#4f463c", cursor: "pointer" }}>
            Mark as signature frame (large spotlight on gallery)
          </label>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <Spinner /> : null}
            {editing ? "Save Changes" : "Add to Gallery"}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Remove frame?"
        message={`"${deleting?.title}" will be removed from the public gallery.`}
        busy={deleteBusy}
      />
    </motion.div>
  );
}