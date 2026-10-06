"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CloudOff,
  Grid2X2,
  Images,
  LayoutList,
  Loader2,
  Maximize2,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  api,
  matchesSearch,
  useAction,
  useResource,
} from "@/components/admin/api";
import {
  Btn,
  Card,
  Check,
  Confirm,
  Dropdown,
  Empty,
  ErrorState,
  IBtn,
  Input,
  Label,
  Loading,
  Modal,
  PageHead,
  Pill,
  SearchBox,
  Switch,
  Textarea,
  Toolbar,
  formatBytes,
  formatDate,
  useToast,
} from "@/components/admin/ui";

/**
 * Gallery.
 *
 * Upload and delete are the two jobs here. Files go to Cloudinary through
 * POST /api/v1/gallery, and deleting a row also deletes the file, so the
 * library never accumulates orphans.
 */

const CATEGORIES = ["Events", "Portraits", "Field Study", "Workshops", "Milestones"];

/* ------------------------------------------------------------------ uploader */

function UploadPanel({ open, onClose, onUploaded }) {
  const toast = useToast();
  const picker = useRef(null);

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [busy, setBusy] = useState(false);

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );

  function choose(list) {
    const picked = [...list].filter((file) => file.type.startsWith("image/"));
    setFiles(picked);
    if (!title) setTitle(picked[0]?.name.replace(/\.[^.]+$/, "") ?? "");
  }

  async function submit() {
    if (files.length === 0) return;

    const form = new FormData();
    files.forEach((file) => form.append("files", file));
    form.append("title", title);
    form.append("caption", caption);
    form.append("category", category);
    form.append("tags", tags);

    setBusy(true);

    try {
      const result = await api.gallery.upload(form);

      if (result.created.length > 0) {
        onUploaded(result.created);
        toast.push(`${result.created.length} ${result.created.length === 1 ? "image" : "images"} uploaded`);
      }

      if (result.failed.length > 0) {
        toast.push(
          `${result.failed.length} rejected — ${result.failed[0].error}`,
          "error",
        );
      }

      if (result.created.length > 0 && result.failed.length === 0) {
        setFiles([]);
        setTitle("");
        setCaption("");
        setTags("");
        onClose();
      }
    } catch (error) {
      toast.push(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Upload images"
      sub="Files are stored on Cloudinary and removed from there when you delete them here."
      footer={
        <>
          <Btn onClick={onClose} disabled={busy}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={submit} disabled={busy || files.length === 0}>
            {busy
              ? "Uploading…"
              : `Upload ${files.length > 0 ? `${files.length} ` : ""}image${files.length === 1 ? "" : "s"}`}
          </Btn>
        </>
      }
    >
      <div className="space-y-5">
        <input
          ref={picker}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => choose(event.target.files)}
        />

        <button
          type="button"
          onClick={() => picker.current?.click()}
          className="a-focus flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--a-line)] px-6 py-10 transition-colors hover:border-olive hover:bg-sand/25"
        >
          <Upload className="h-6 w-6 text-muted" aria-hidden="true" />
          <span className="mt-2.5 text-[14px] font-medium text-ink">
            {files.length > 0 ? `${files.length} selected` : "Choose images"}
          </span>
          <span className="mt-1 text-[12px] text-muted">
            JPG, PNG, WebP or GIF · up to 8 MB each
          </span>
        </button>

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {previews.map(({ file, url }) => (
              <div
                key={file.name}
                className="group relative aspect-square overflow-hidden rounded-lg bg-sand/50"
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((f) => f !== file))}
                  aria-label={`Remove ${file.name}`}
                  className="a-focus absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#fffdf9]/95 text-[#b4504a]"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Label htmlFor="upload-category" label="Category">
            <Dropdown
              value={category}
              onChange={setCategory}
              options={CATEGORIES}
              label="Category"
            />
          </Label>

          <Label htmlFor="upload-tags" label="Tags" hint="Comma separated">
            <Input
              id="upload-tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Summit, Leadership"
            />
          </Label>
        </div>

        <Label htmlFor="upload-title" label="Title" hint="Applies to every file in this batch">
          <Input
            id="upload-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Summit Address"
          />
        </Label>

        <Label htmlFor="upload-caption" label="Caption">
          <Textarea
            id="upload-caption"
            rows={2}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Leading a panel discussion on…"
          />
        </Label>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------- editor */

function ImageEditor({ image, onClose, onSave, busy }) {
  const [draft, setDraft] = useState({
    title: image.title ?? "",
    caption: image.caption ?? "",
    category: image.category ?? CATEGORIES[0],
    tags: (image.tags ?? []).join(", "),
    featured: Boolean(image.featured),
  });

  const set = (patch) => setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="Edit image"
      footer={
        <>
          <Btn onClick={onClose} disabled={busy}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={() => onSave(draft)} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </Btn>
        </>
      }
    >
      <div className="space-y-4">
        <img
          src={image.url}
          alt=""
          className="aspect-[16/10] w-full rounded-xl object-cover"
          style={{ background: "var(--a-line-soft)" }}
        />

        <Label htmlFor="image-title" label="Title">
          <Input
            id="image-title"
            value={draft.title}
            onChange={(event) => set({ title: event.target.value })}
          />
        </Label>

        <Label htmlFor="image-caption" label="Caption">
          <Textarea
            id="image-caption"
            rows={3}
            value={draft.caption}
            onChange={(event) => set({ caption: event.target.value })}
          />
        </Label>

        <Label htmlFor="image-category" label="Category">
          <Dropdown
            value={CATEGORIES.includes(draft.category) ? draft.category : CATEGORIES[0]}
            onChange={(value) => set({ category: value })}
            options={CATEGORIES}
            label="Category"
          />
        </Label>

        <Label htmlFor="image-tags" label="Tags" hint="Comma separated">
          <Input
            id="image-tags"
            value={draft.tags}
            onChange={(event) => set({ tags: event.target.value })}
          />
        </Label>

        <div className="flex items-center gap-2.5">
          <Switch
            checked={draft.featured}
            onChange={(value) => set({ featured: value })}
            label="Featured"
          />
          <span className="text-[13px] text-ink">Feature this image</span>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------------------------------------------- page */

export default function AdminGalleryPage() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { busy, run } = useAction();

  const { data, loading, error, reload, setData } = useResource(
    () => api.gallery.list(),
    "gallery",
  );

  const rows = data ?? [];

  const categories = useMemo(
    () => [...new Set(rows.map((row) => row.category).filter(Boolean))].sort(),
    [rows],
  );

  const visible = useMemo(
    () =>
      rows.filter(
        (row) =>
          (category === "all" || row.category === category) &&
          matchesSearch(row, search, ["title", "caption", "category", "tags"]),
      ),
    [rows, category, search],
  );

  const allSelected = visible.length > 0 && visible.every((row) => selected.includes(row._id));

  function toggleOne(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function saveEdit(draft) {
    const target = editing;
    const ok = await run(() => api.gallery.update(target._id, draft));

    if (!ok) {
      toast.push("Could not save the image", "error");
      return;
    }

    setData(rows.map((row) => (row._id === target._id ? { ...row, ...draft } : row)));
    setEditing(null);
    toast.push("Image updated");
  }

  async function remove() {
    const ids = pendingDelete === "bulk" ? [...selected] : [pendingDelete._id];

    const ok = await run(async () => {
      for (const id of ids) await api.gallery.remove(id);
    });

    if (!ok) {
      toast.push("Could not delete the image", "error");
      return;
    }

    setData(rows.filter((row) => !ids.includes(row._id)));
    setSelected([]);
    setPreview(null);
    setPendingDelete(null);
    toast.push(
      ids.length === 1 ? "Image and file deleted" : `${ids.length} images and files deleted`,
      "info",
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <PageHead
        eyebrow="Media"
        title="Gallery"
        description="Upload images to Cloudinary and delete them here — the file is removed too."
        actions={
          <>
            <Btn className="gap-1.5" onClick={reload}>
              Refresh
            </Btn>
            <Btn variant="primary" className="gap-1.5" onClick={() => setUploading(true)}>
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload images
            </Btn>
          </>
        }
      />

      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search gallery" />
        <Dropdown
          value={category}
          onChange={setCategory}
          options={["all", ...categories]}
          label="Filter by category"
          className="sm:w-48"
        />
        <p className="text-[13px] text-muted sm:ml-auto sm:shrink-0">
          {visible.length} of {rows.length} assets
        </p>

        <div className="flex items-center gap-1 rounded-xl border border-[var(--a-line)] bg-[#fbf9f4] p-1">
          {[
            { key: "grid", icon: Grid2X2, label: "Grid view" },
            { key: "list", icon: LayoutList, label: "List view" },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setView(option.key)}
              aria-label={option.label}
              aria-pressed={view === option.key}
              className={`a-focus flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                view === option.key ? "bg-cream text-ink shadow-[var(--a-shadow)]" : "text-muted hover:text-ink"
              }`}
            >
              <option.icon className="h-4 w-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </Toolbar>

      {selected.length > 0 && (
        <Card className="flex flex-wrap items-center gap-3 px-4 py-3">
          <Check
            checked={allSelected}
            indeterminate={!allSelected}
            onChange={() => setSelected(allSelected ? [] : visible.map((row) => row._id))}
            label="Select every visible image"
          />
          <p className="text-[13px] font-medium text-ink">{selected.length} selected</p>
          <Btn variant="danger" className="gap-1.5" onClick={() => setPendingDelete("bulk")} disabled={busy}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete selected
          </Btn>
          <Btn className="ml-auto" onClick={() => setSelected([])}>
            Clear
          </Btn>
        </Card>
      )}

      {loading && (
        <Card>
          <Loading rows={4} label="Loading gallery" />
        </Card>
      )}

      {!loading && error && (
        <Card>
          <ErrorState error={error} onRetry={reload} />
        </Card>
      )}

      {!loading && !error && rows.length === 0 && (
        <Card>
          <Empty
            icon={Images}
            title="Nothing in the gallery"
            sub="Upload your first images and they will show up here and on the public site."
            action={
              <Btn variant="primary" onClick={() => setUploading(true)}>
                Upload images
              </Btn>
            }
          />
        </Card>
      )}

      {!loading && !error && rows.length > 0 && visible.length === 0 && (
        <Card>
          <Empty
            icon={Images}
            title="Nothing matches those filters"
            action={
              <Btn
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                Clear filters
              </Btn>
            }
          />
        </Card>
      )}

      <AnimatePresence mode="popLayout">
        {view === "grid" && visible.length > 0 && (
          <motion.div
            key="grid"
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((image, index) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38, delay: Math.min(index, 8) * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card
                  lift
                  className={`group overflow-hidden ${selected.includes(image._id) ? "ring-2 ring-olive" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand/50">
                    <img
                      src={image.url}
                      alt={image.title || ""}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                      <Check
                        checked={selected.includes(image._id)}
                        onChange={() => toggleOne(image._id)}
                        label={`Select ${image.title || "image"}`}
                        className="!h-4 !w-4"
                      />
                      <Pill tone="muted" className="!bg-cream/92">
                        {image.category}
                      </Pill>
                      {image.featured && (
                        <Pill tone="gold" className="!bg-cream/92">
                          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                          Featured
                        </Pill>
                      )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[rgba(42,42,38,0.45)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                      <button
                        type="button"
                        onClick={() => setPreview(image)}
                        aria-label={`Preview ${image.title || "image"}`}
                        className="a-focus flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-ink"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(image)}
                        aria-label={`Edit ${image.title || "image"}`}
                        className="a-focus h-10 rounded-full bg-cream/95 px-4 text-[13px] font-medium text-ink"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium text-ink">
                        {image.title || "Untitled"}
                      </p>
                      <p className="text-[11.5px] text-muted">
                        {formatBytes(image.bytes)} · {formatDate(image.createdAt)}
                      </p>
                    </div>
                    <IBtn
                      label={`Delete ${image.title || "image"}`}
                      onClick={() => setPendingDelete(image)}
                      className="hover:text-[#a0433d]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </IBtn>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {view === "list" && visible.length > 0 && (
          <motion.div key="list" layout className="space-y-3">
            {visible.map((image, index) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.03 }}
              >
                <Card
                  className={`flex items-center gap-4 p-3.5 ${
                    selected.includes(image._id) ? "ring-2 ring-olive" : ""
                  }`}
                >
                  <Check
                    checked={selected.includes(image._id)}
                    onChange={() => toggleOne(image._id)}
                    label={`Select ${image.title || "image"}`}
                  />

                  <button
                    type="button"
                    onClick={() => setPreview(image)}
                    aria-label={`Preview ${image.title || "image"}`}
                    className="a-focus h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-sand/50"
                  >
                    <img src={image.url} alt="" className="h-full w-full object-cover" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{image.title || "Untitled"}</p>
                    <p className="mt-0.5 truncate text-[12px] text-muted">
                      {image.category} · {formatBytes(image.bytes)} · {formatDate(image.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Btn className="!h-9 !px-3" onClick={() => setEditing(image)}>
                      Edit
                    </Btn>
                    <IBtn
                      label={`Delete ${image.title || "image"}`}
                      onClick={() => setPendingDelete(image)}
                      className="hover:text-[#a0433d]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </IBtn>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <UploadPanel
        open={uploading}
        onClose={() => setUploading(false)}
        onUploaded={(created) => {
          setData([...created, ...rows]);
          setUploading(false);
        }}
      />

      {editing && (
        <ImageEditor
          image={editing}
          busy={busy}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      )}

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview?.title || "Image"}
        description={preview ? `${preview.category} · ${formatBytes(preview.bytes)}` : ""}
        size="lg"
        footer={
          <>
            <Btn onClick={() => setPreview(null)}>Close</Btn>
            <Btn className="gap-1.5" onClick={() => setEditing(preview)}>
              Edit details
            </Btn>
            <Btn variant="danger" className="gap-1.5" onClick={() => setPendingDelete(preview)}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Remove
            </Btn>
          </>
        }
      >
        {preview && (
          <>
            <img
              src={preview.url}
              alt={preview.title || ""}
              className="max-h-[52vh] w-full rounded-xl object-contain"
              style={{ background: "var(--a-line-soft)" }}
            />
            {preview.caption && (
              <p className="mt-4 text-[14px] leading-relaxed text-muted">{preview.caption}</p>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-[12px] break-all text-muted">
              <CloudOff className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {preview.url}
            </p>
          </>
        )}
      </Modal>

      <Confirm
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={remove}
        busy={busy}
        title={pendingDelete === "bulk" ? "Delete images" : "Remove image"}
        confirmLabel={pendingDelete === "bulk" ? "Delete everything" : "Remove"}
        body={
          pendingDelete === "bulk"
            ? `${selected.length} images will be removed from the gallery and deleted from Cloudinary. This cannot be undone.`
            : pendingDelete
              ? `“${pendingDelete.title || "This image"}” will be removed from the gallery and deleted from Cloudinary. Any page using it will fall back to a placeholder.`
              : ""
        }
      />

      {busy && (
        <div className="pointer-events-none fixed right-5 bottom-5 z-[95] flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-[13px] font-medium text-cream shadow-[var(--a-shadow-lg)]">
          <Loader2 className="h-4 w-4 a-spin" aria-hidden="true" />
          Working…
        </div>
      )}
    </motion.div>
  );
}