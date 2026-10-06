"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  Plus,
  Trash2,
  X,
} from "lucide-react";
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
  Switch,
  TD,
  TR,
  Table,
  Textarea,
  Toolbar,
  formatDate,
  useToast,
} from "@/components/admin/ui";

/**
 * Projects.
 *
 * This page is the reference implementation the other sections follow: list,
 * filter, search, sort, page, create, edit, delete — all through
 * `/api/v1/projects`. The only project-specific part is the editor form.
 */

const PAGE_SIZE = 8;

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  client: "",
  year: String(new Date().getFullYear()),
  duration: "",
  coverImage: "",
  gallery: "",
  alt: "",
  excerpt: "",
  services: "",
  overview: "",
  challenge: "",
  approach: [],
  outcomes: [],
  results: "",
  status: "published",
  featured: false,
};

/* ------------------------------------------------------------- form helpers */

function asList(value) {
  return Array.isArray(value) ? value.join("\n") : String(value ?? "");
}

function ListField({ id, label, hint, rows = 3, value, onChange, placeholder }) {
  return (
    <Label htmlFor={id} label={label} hint={hint}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </Label>
  );
}

function StepEditor({ steps, onChange }) {
  function update(index, patch) {
    onChange(steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={index}
          className="rounded-xl p-3.5"
          style={{ border: "1px solid var(--a-line)", background: "rgba(245,242,236,0.4)" }}
        >
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-semibold tracking-wide text-muted uppercase">
              Step {index + 1}
            </span>
            <IBtn label={`Remove step ${index + 1}`} onClick={() => onChange(steps.filter((_, i) => i !== index))}>
              <X className="h-3.5 w-3.5" />
            </IBtn>
          </div>

          <Input
            value={step.title}
            onChange={(event) => update(index, { title: event.target.value })}
            placeholder="Step title"
            aria-label={`Step ${index + 1} title`}
          />
          <Textarea
            rows={3}
            className="mt-2"
            value={step.text}
            onChange={(event) => update(index, { text: event.target.value })}
            placeholder="What was done in this step"
            aria-label={`Step ${index + 1} text`}
          />
        </div>
      ))}

      <Btn
        className="w-full gap-1.5"
        onClick={() => onChange([...steps, { title: "", text: "" }])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add step
      </Btn>
    </div>
  );
}

function OutcomeEditor({ outcomes, onChange }) {
  function update(index, patch) {
    onChange(outcomes.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-3">
      {outcomes.map((outcome, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={outcome.value}
            onChange={(event) => update(index, { value: event.target.value })}
            placeholder="3×"
            aria-label={`Outcome ${index + 1} value`}
            className="!w-28 shrink-0"
          />
          <Input
            value={outcome.label}
            onChange={(event) => update(index, { label: event.target.value })}
            placeholder="Enquiries per month"
            aria-label={`Outcome ${index + 1} label`}
          />
          <IBtn label={`Remove outcome ${index + 1}`} onClick={() => onChange(outcomes.filter((_, i) => i !== index))}>
            <X className="h-3.5 w-3.5" />
          </IBtn>
        </div>
      ))}

      <Btn
        className="w-full gap-1.5"
        onClick={() => onChange([...outcomes, { value: "", label: "" }])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add outcome
      </Btn>
    </div>
  );
}

/* ------------------------------------------------------------------- editor */

function ProjectEditor({ draft, setDraft, onCancel, onSubmit, busy }) {
  const set = (patch) => setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <Modal
      open
      onClose={onCancel}
      size="lg"
      title={draft.id ? "Edit project" : "New project"}
      sub="Everything except the title is optional — you can fill the rest in later."
      footer={
        <>
          <Btn onClick={onCancel} disabled={busy}>
            Cancel
          </Btn>
          <Btn variant="primary" onClick={onSubmit} disabled={busy}>
            {busy ? "Saving…" : draft.id ? "Save changes" : "Create project"}
          </Btn>
        </>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Label htmlFor="title" label="Title">
            <Input
              id="title"
              value={draft.title}
              onChange={(event) => set({ title: event.target.value })}
              placeholder="Session 1:1 Coaching Program"
            />
          </Label>

          <Label htmlFor="slug" label="Slug" hint="Leave blank to generate from the title">
            <Input
              id="slug"
              value={draft.slug}
              onChange={(event) => set({ slug: event.target.value })}
              placeholder="session-1-1-coaching-program"
            />
          </Label>

          <Label htmlFor="category" label="Category">
            <Input
              id="category"
              value={draft.category}
              onChange={(event) => set({ category: event.target.value })}
              placeholder="Brand Identity"
            />
          </Label>

          <Label htmlFor="client" label="Client">
            <Input
              id="client"
              value={draft.client}
              onChange={(event) => set({ client: event.target.value })}
              placeholder="Independent Creator"
            />
          </Label>

          <Label htmlFor="year" label="Year">
            <Input
              id="year"
              value={draft.year}
              onChange={(event) => set({ year: event.target.value })}
              placeholder="2026"
            />
          </Label>

          <Label htmlFor="duration" label="Duration">
            <Input
              id="duration"
              value={draft.duration}
              onChange={(event) => set({ duration: event.target.value })}
              placeholder="8 weeks"
            />
          </Label>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Label label="Status">
            <Dropdown
              value={draft.status}
              onChange={(value) => set({ status: value })}
              options={["published", "draft"]}
              label="Status"
              className="sm:w-40"
            />
          </Label>

          <div className="flex items-center gap-2.5">
            <Switch
              checked={draft.featured}
              onChange={(value) => set({ featured: value })}
              label="Featured"
            />
            <span className="text-[13px] text-ink">Feature this project</span>
          </div>
        </div>

        <ImageField
          value={draft.coverImage}
          onChange={(value) => set({ coverImage: value })}
          folder="kamaldeep/projects"
          label="Cover image"
          hint="Used on the listing card and as the hero on the detail page"
        />

        <ListField
          id="gallery"
          label="Gallery images"
          hint="One URL per line — shown as 'Selected frames'"
          rows={3}
          value={draft.gallery}
          onChange={(value) => set({ gallery: value })}
          placeholder={"https://res.cloudinary.com/…/one.jpg\nhttps://res.cloudinary.com/…/two.jpg"}
        />

        <Label htmlFor="excerpt" label="Excerpt" hint="One or two sentences — used on cards and for SEO">
          <Textarea
            id="excerpt"
            rows={2}
            value={draft.excerpt}
            onChange={(event) => set({ excerpt: event.target.value })}
          />
        </Label>

        <ListField
          id="services"
          label="Services"
          hint="One per line"
          rows={3}
          value={draft.services}
          onChange={(value) => set({ services: value })}
          placeholder={"Brand Strategy\nVisual Identity"}
        />

        <ListField
          id="overview"
          label="The brief"
          hint="Separate paragraphs with a blank line"
          rows={5}
          value={draft.overview}
          onChange={(value) => set({ overview: value })}
        />

        <Label htmlFor="challenge" label="What was in the way">
          <Textarea
            id="challenge"
            rows={4}
            value={draft.challenge}
            onChange={(event) => set({ challenge: event.target.value })}
          />
        </Label>

        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-ink">How it was built</p>
          <StepEditor steps={draft.approach} onChange={(approach) => set({ approach })} />
        </div>

        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-ink">What changed</p>
          <OutcomeEditor outcomes={draft.outcomes} onChange={(outcomes) => set({ outcomes })} />
        </div>

        <Label htmlFor="results" label="Where it landed">
          <Textarea
            id="results"
            rows={4}
            value={draft.results}
            onChange={(event) => set({ results: event.target.value })}
          />
        </Label>
      </div>
    </Modal>
  );
}

/* --------------------------------------------------------------------- page */

export default function AdminProjectsPage() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState([]);

  const [draft, setDraft] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { busy, run } = useAction();

  // Everything is loaded once; the filter row narrows it in the browser so the
  // dropdowns keep every option instead of collapsing to what is on screen.
  const { data, loading, error, reload, setData } = useResource(
    () => api.projects.list(),
    "projects",
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
          matchesSearch(row, search, ["title", "category", "client", "excerpt"]),
      ),
    [rows, status, category, search],
  );

  const { sorted, sort, toggle } = useSort(filtered, { key: "updatedAt", direction: "desc" });
  const paged = usePaged(sorted, PAGE_SIZE);

  const allSelected = paged.rows.length > 0 && paged.rows.every((row) => selected.includes(row._id));

  function openNew() {
    setDraft({ ...EMPTY });
  }

  function openEdit(project) {
    setDraft({
      ...EMPTY,
      ...project,
      id: project._id,
      gallery: asList(project.gallery),
      services: asList(project.services),
      overview: asList(project.overview),
      approach: (project.approach ?? []).map((step) => ({ ...step })),
      outcomes: (project.outcomes ?? []).map((outcome) => ({ ...outcome })),
    });
  }

  async function save() {
    const title = draft.title.trim();
    if (!title) {
      toast.push("Title is required", "error");
      return;
    }

    const payload = {
      ...draft,
      title,
      gallery: draft.gallery,
      services: draft.services,
      overview: draft.overview,
    };

    const ok = await run(async () => {
      if (draft.id) await api.projects.update(draft.id, payload);
      else await api.projects.create(payload);
    });

    if (!ok) {
      toast.push("Could not save the project", "error");
      return;
    }

    toast.push(draft.id ? "Project updated" : "Project created");
    setDraft(null);
    reload();
  }

  async function remove() {
    const target = pendingDelete;
    const ok = await run(() => api.projects.remove(target._id));

    if (!ok) {
      toast.push("Could not delete the project", "error");
      return;
    }

    setData(rows.filter((row) => row._id !== target._id));
    setSelected(selected.filter((id) => id !== target._id));
    setPendingDelete(null);
    toast.push("Project deleted", "info");
  }

  async function removeSelected() {
    const ids = [...selected];
    const ok = await run(async () => {
      for (const id of ids) await api.projects.remove(id);
    });

    if (!ok) {
      toast.push("Could not delete every project", "error");
      return;
    }

    setData(rows.filter((row) => !selected.includes(row._id)));
    setSelected([]);
    toast.push(`${ids.length} projects deleted`, "info");
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
        eyebrow="Case studies"
        title="Projects"
        description="The work you show off. Each one becomes a page under /projects."
        actions={
          <Btn variant="primary" className="gap-1.5" onClick={openNew}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Btn>
        }
      />

      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search projects" />
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
          {paged.total} {paged.total === 1 ? "project" : "projects"}
        </p>
      </Toolbar>

      {selected.length > 0 && (
        <Card className="flex flex-wrap items-center gap-3 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">
            {selected.length} selected
          </p>
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
        {loading && <Loading rows={5} label="Loading projects" />}
        {!loading && error && <ErrorState error={error} onRetry={reload} />}

        {!loading && !error && paged.total === 0 && (
          <Empty
            icon={Briefcase}
            title="No projects yet"
            sub="Add your first case study and it appears on /projects straight away."
            action={<Btn variant="primary" onClick={openNew}>Create a project</Btn>}
          />
        )}

        {!loading && !error && paged.total > 0 && (
          <>
            <Table
              head={[
                { label: "" },
                {
                  label: "Project",
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
                <TD className="pr-0">
                  <span className="text-[11.5px] text-muted">on this page</span>
                </TD>
                <TD className="hidden sm:table-cell" />
                <TD className="hidden lg:table-cell" />
                <TD className="hidden md:table-cell" />
                <TD />
              </TR>

              {paged.rows.map((project) => (
                <TR key={project._id}>
                  <TD className="w-10">
                    <Check
                      checked={selected.includes(project._id)}
                      onChange={() => toggleOne(project._id)}
                      label={`Select ${project.title}`}
                    />
                  </TD>

                  <TD className="pr-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-sand/60"
                        style={{ border: "1px solid var(--a-line-soft)" }}
                      >
                        {project.coverImage && (
                          <img
                            src={project.coverImage}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.visibility = "hidden";
                            }}
                          />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-ink">{project.title}</p>
                        <p className="mt-0.5 truncate text-[11.5px] text-muted">
                          /projects/{project.slug}
                        </p>
                      </div>
                    </div>
                  </TD>

                  <TD className="hidden sm:table-cell">
                    <Pill tone={STATUS_TONE[project.status]} dot>
                      {STATUS_LABEL[project.status]}
                    </Pill>
                  </TD>

                  <TD className="hidden text-[13px] text-muted lg:table-cell">
                    {project.category || "—"}
                  </TD>

                  <TD className="hidden text-[13px] text-muted md:table-cell">
                    {formatDate(project.updatedAt)}
                  </TD>

                  <TD>
                    <div className="flex items-center justify-end gap-1">
                      {project.status === "published" && (
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          aria-label={`View ${project.title} on the site`}
                          title="View on site"
                          className="a-icon-btn a-focus"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <Btn className="!h-9 !px-3" onClick={() => openEdit(project)}>
                        Edit
                      </Btn>
                      <IBtn
                        label={`Delete ${project.title}`}
                        onClick={() => setPendingDelete(project)}
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
              noun="projects"
            />
          </>
        )}
      </Card>

      {draft && (
        <ProjectEditor
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
        title="Delete project"
        body={
          pendingDelete
            ? `“${pendingDelete.title}” will be removed and /projects/${pendingDelete.slug} will stop resolving. This cannot be undone.`
            : ""
        }
      />
    </motion.div>
  );
}