"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, FileText, Plus, Trash2 } from "lucide-react";
import {
  api,
  matchesSearch,
  useAction,
  usePaged,
  useResource,
  useSort,
} from "@/components/admin/api";
import ImageField from "@/components/admin/ImageField";
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
  Pager,
  PageHead,
  Pill,
  STATUS_LABEL,
  STATUS_TONE,
  SearchBox,
  TD,
  TR,
  Table,
  Textarea,
  Toolbar,
  formatDate,
  useToast,
} from "@/components/admin/ui";

/**
 * Articles.
 *
 * Same shape as Projects — list, filter, search, sort, page, create, edit,
 * delete through /api/v1/articles. Only the editor fields differ.
 */

const PAGE_SIZE = 8;

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  coverImage: "",
  content: "",
  highlights: "",
  readingTime: "5 min read",
  status: "published",
};

/* ------------------------------------------------------------------- editor */

function ArticleEditor({ draft, setDraft, onCancel, onSubmit, busy }) {
  const set = (patch) => setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <Modal
      open
      onClose={onCancel}
      size="lg"
      title={draft.id ? "Edit article" : "New article"}
      sub="Blank lines in the body become separate paragraphs."
      footer={
        <>
          <Btn onClick={onCancel} disabled={busy}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={onSubmit} disabled={busy}>
            {busy ? "Saving…" : draft.id ? "Save changes" : "Create article"}
          </Btn>
        </>
      }
    >
      <div className="space-y-6">
        <Label htmlFor="title" label="Title">
          <Input
            id="title"
            value={draft.title}
            onChange={(event) => set({ title: event.target.value })}
            placeholder="Building Your Personal Brand"
          />
        </Label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Label htmlFor="slug" label="Slug" hint="Leave blank to generate from the title">
            <Input
              id="slug"
              value={draft.slug}
              onChange={(event) => set({ slug: event.target.value })}
            />
          </Label>

          <Label htmlFor="category" label="Category">
            <Input
              id="category"
              value={draft.category}
              onChange={(event) => set({ category: event.target.value })}
              placeholder="Brand"
            />
          </Label>

          <Label htmlFor="readingTime" label="Reading time">
            <Input
              id="readingTime"
              value={draft.readingTime}
              onChange={(event) => set({ readingTime: event.target.value })}
              placeholder="5 min read"
            />
          </Label>

          <Label label="Status">
            <Dropdown
              value={draft.status}
              onChange={(value) => set({ status: value })}
              options={["published", "draft"]}
              label="Status"
            />
          </Label>
        </div>

        <ImageField
          value={draft.coverImage}
          onChange={(value) => set({ coverImage: value })}
          folder="kamaldeep/articles"
          label="Cover image"
        />

        <Label htmlFor="excerpt" label="Excerpt" hint="Shown on cards and used as the meta description">
          <Textarea
            id="excerpt"
            rows={2}
            value={draft.excerpt}
            onChange={(event) => set({ excerpt: event.target.value })}
          />
        </Label>

        <Label
          htmlFor="content"
          label="Body"
          hint="Separate paragraphs with a blank line. The first paragraph is styled as the lead."
        >
          <Textarea
            id="content"
            rows={12}
            value={draft.content}
            onChange={(event) => set({ content: event.target.value })}
            className="font-[15px] leading-[1.8]"
          />
        </Label>

        <Label htmlFor="highlights" label="Key takeaways" hint="One per line — optional">
          <Textarea
            id="highlights"
            rows={3}
            value={draft.highlights}
            onChange={(event) => set({ highlights: event.target.value })}
          />
        </Label>
      </div>
    </Modal>
  );
}

/* --------------------------------------------------------------------- page */

export default function AdminArticlesPage() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState([]);

  const [draft, setDraft] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { busy, run } = useAction();

  const { data, loading, error, reload, setData } = useResource(
    () => api.articles.list(),
    "articles",
  );

  const rows = data ?? [];

  const categories = useMemo(
    () => [...new Set(rows.map((row) => row.category).filter(Boolean))].sort(),
    [rows],
  );

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          (status === "all" || row.status === status) &&
          (category === "all" || row.category === category) &&
          matchesSearch(row, search, ["title", "category", "excerpt"]),
      ),
    [rows, status, category, search],
  );

  const { sorted, sort, toggle } = useSort(filtered, { key: "publishedAt", direction: "desc" });
  const paged = usePaged(sorted, PAGE_SIZE);

  const allSelected = paged.rows.length > 0 && paged.rows.every((row) => selected.includes(row._id));

  function openNew() {
    setDraft({ ...EMPTY });
  }

  function openEdit(article) {
    setDraft({
      ...EMPTY,
      ...article,
      id: article._id,
      content: (article.content ?? []).join("\n\n"),
      highlights: (article.highlights ?? []).join("\n"),
    });
  }

  async function save() {
    const title = draft.title.trim();
    if (!title) {
      toast.push("Title is required", "error");
      return;
    }

    const ok = await run(async () => {
      if (draft.id) await api.articles.update(draft.id, draft);
      else await api.articles.create(draft);
    });

    if (!ok) {
      toast.push("Could not save the article", "error");
      return;
    }

    toast.push(draft.id ? "Article updated" : "Article created");
    setDraft(null);
    reload();
  }

  async function remove() {
    const target = pendingDelete;
    const ok = await run(() => api.articles.remove(target._id));

    if (!ok) {
      toast.push("Could not delete the article", "error");
      return;
    }

    setData(rows.filter((row) => row._id !== target._id));
    setSelected(selected.filter((id) => id !== target._id));
    setPendingDelete(null);
    toast.push("Article deleted", "info");
  }

  async function removeSelected() {
    const ids = [...selected];
    const ok = await run(async () => {
      for (const id of ids) await api.articles.remove(id);
    });

    if (!ok) {
      toast.push("Could not delete every article", "error");
      return;
    }

    setData(rows.filter((row) => !selected.includes(row._id)));
    setSelected([]);
    toast.push(`${ids.length} articles deleted`, "info");
  }

  function toggleOne(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <PageHead
        eyebrow="Journal"
        title="Articles"
        description="Everything published under /blogs. Drafts stay hidden until you publish them."
        actions={
          <Btn variant="primary" className="gap-1.5" onClick={openNew}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New article
          </Btn>
        }
      />

      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search articles" />
        <Dropdown
          value={status}
          onChange={setStatus}
          options={["all", "published", "draft"]}
          label="Filter by status"
          className="sm:w-40"
        />
        <Dropdown
          value={category}
          onChange={setCategory}
          options={["all", ...categories]}
          label="Filter by category"
          className="sm:w-48"
        />
        <p className="text-[13px] text-muted sm:ml-auto sm:shrink-0">
          {paged.total} {paged.total === 1 ? "article" : "articles"}
        </p>
      </Toolbar>

      {selected.length > 0 && (
        <Card className="flex flex-wrap items-center gap-3 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">{selected.length} selected</p>
          <Btn variant="danger" className="gap-1.5" onClick={removeSelected} disabled={busy}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete selected
          </Btn>
          <Btn className="ml-auto" onClick={() => setSelected([])}>
            Clear
          </Btn>
        </Card>
      )}

      <Card className="overflow-hidden">
        {loading && <Loading rows={5} label="Loading articles" />}
        {!loading && error && <ErrorState error={error} onRetry={reload} />}

        {!loading && !error && paged.total === 0 && (
          <Empty
            icon={FileText}
            title={rows.length === 0 ? "No articles yet" : "Nothing matches those filters"}
            sub={
              rows.length === 0
                ? "Write your first article and it appears under /blogs straight away."
                : "Try a different keyword or clear the filters."
            }
            action={
              rows.length === 0 ? (
                <Btn variant="primary" onClick={openNew}>
                  Write an article
                </Btn>
              ) : (
                <Btn
                  onClick={() => {
                    setSearch("");
                    setStatus("all");
                    setCategory("all");
                  }}
                >
                  Clear filters
                </Btn>
              )
            }
          />
        )}

        {!loading && !error && paged.total > 0 && (
          <>
            <Table
              head={[
                { label: "" },
                {
                  label: "Title",
                  sort: () => toggle("title"),
                  sorted: sort.key === "title" ? sort.direction : undefined,
                },
                {
                  label: "Status",
                  hideBelow: "hidden sm:table-cell",
                  sort: () => toggle("status"),
                  sorted: sort.key === "status" ? sort.direction : undefined,
                },
                { label: "Category", hideBelow: "hidden lg:table-cell" },
                {
                  label: "Views",
                  hideBelow: "hidden lg:table-cell",
                  sort: () => toggle("views"),
                  sorted: sort.key === "views" ? sort.direction : undefined,
                },
                {
                  label: "Updated",
                  hideBelow: "hidden md:table-cell",
                  sort: () => toggle("updatedAt"),
                  sorted: sort.key === "updatedAt" ? sort.direction : undefined,
                },
                { label: "" },
              ]}
            >
              <TR>
                <TD className="w-10">
                  <Check
                    checked={allSelected}
                    indeterminate={!allSelected && paged.rows.some((row) => selected.includes(row._id))}
                    onChange={() => setSelected(allSelected ? [] : paged.rows.map((row) => row._id))}
                    label="Select all on this page"
                  />
                </TD>
                <TD>
                  <span className="text-[11.5px] text-muted">on this page</span>
                </TD>
                <TD className="hidden sm:table-cell" />
                <TD className="hidden lg:table-cell" />
                <TD className="hidden lg:table-cell" />
                <TD className="hidden md:table-cell" />
                <TD />
              </TR>

              {paged.rows.map((article) => (
                <TR key={article._id}>
                  <TD className="w-10">
                    <Check
                      checked={selected.includes(article._id)}
                      onChange={() => toggleOne(article._id)}
                      label={`Select ${article.title}`}
                    />
                  </TD>

                  <TD className="pr-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-sand/60"
                        style={{ border: "1px solid var(--a-line-soft)" }}
                      >
                        {article.coverImage && (
                          <img
                            src={article.coverImage}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.visibility = "hidden";
                            }}
                          />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-ink">{article.title}</p>
                        <p className="mt-0.5 truncate text-[11.5px] text-muted">
                          /blogs/{article.slug}
                        </p>
                      </div>
                    </div>
                  </TD>

                  <TD className="hidden sm:table-cell">
                    <Pill tone={STATUS_TONE[article.status]} dot>
                      {STATUS_LABEL[article.status]}
                    </Pill>
                  </TD>

                  <TD className="hidden text-[13px] text-muted lg:table-cell">
                    {article.category || "—"}
                  </TD>

                  <TD className="hidden text-[13px] text-muted lg:table-cell">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.views.toLocaleString()}
                    </span>
                  </TD>

                  <TD className="hidden text-[13px] text-muted md:table-cell">
                    {formatDate(article.updatedAt)}
                  </TD>

                  <TD>
                    <div className="flex items-center justify-end gap-1">
                      {article.status === "published" && (
                        <Link
                          href={`/blogs/${article.slug}`}
                          target="_blank"
                          aria-label={`View ${article.title} on the site`}
                          title="View on site"
                          className="a-icon-btn a-focus"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Btn className="!h-9 !px-3" onClick={() => openEdit(article)}>
                        Edit
                      </Btn>
                      <IBtn
                        label={`Delete ${article.title}`}
                        onClick={() => setPendingDelete(article)}
                        className="hover:text-[#a0433d]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </IBtn>
                    </div>
                  </TD>
                </TR>
              ))}
            </Table>

            <Pager
              page={paged.page}
              pageCount={paged.pageCount}
              pageSize={paged.pageSize}
              total={paged.total}
              onPage={paged.onPage}
              noun="articles"
            />
          </>
        )}
      </Card>

      {draft && (
        <ArticleEditor
          draft={draft}
          setDraft={setDraft}
          busy={busy}
          onCancel={() => setDraft(null)}
          onSubmit={save}
        />
      )}

      <Confirm
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={remove}
        busy={busy}
        title="Delete article"
        body={
          pendingDelete
            ? `“${pendingDelete.title}” will be removed and /blogs/${pendingDelete.slug} will stop resolving. This cannot be undone.`
            : ""
        }
      />
    </motion.div>
  );
}