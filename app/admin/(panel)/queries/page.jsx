"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCheck,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  Reply,
  Trash2,
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
  CardHead,
  Confirm,
  Dropdown,
  Empty,
  ErrorState,
  IBtn,
  Label,
  Loading,
  Modal,
  PageHead,
  Pill,
  PRIORITY_LABEL,
  PRIORITY_TONE,
  SearchBox,
  STATUS_LABEL,
  STATUS_TONE,
  TD,
  TR,
  Table,
  Textarea,
  Toolbar,
  formatDate,
  timeAgo,
  useToast,
} from "@/components/admin/ui";

/**
 * Queries.
 *
 * Enquiries arrive from POST /api/v1/queries (the /contact form). There is no
 * create button here on purpose — the only thing to do with a query is work
 * through it, so this screen only reads, updates and deletes.
 */

const STATUSES = ["new", "progress", "resolved"];
const PRIORITIES = ["low", "medium", "high"];

/* ------------------------------------------------------------------- detail */

function QueryDetail({ query, busy, onClose, onStatus, onSaveReply }) {
  const [reply, setReply] = useState(query.reply ?? "");

  const dirty = reply !== (query.reply ?? "");

  return (
    <Modal
      open
      onClose={onClose}
      size="md"
      title={query.subject || "Enquiry"}
      description={`${query.name} · ${formatDate(query.createdAt)}`}
      footer={
        <>
          <Btn onClick={onClose} disabled={busy}>
            Close
          </Btn>
          <Btn
            variant="primary"
            className="gap-1.5"
            disabled={busy || !dirty}
            onClick={() => onSaveReply(reply)}
          >
            {busy ? "Saving…" : "Save note"}
          </Btn>
        </>
      }
    >
      <div className="space-y-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Status", node: <Pill tone={STATUS_TONE[query.status]} dot>{STATUS_LABEL[query.status]}</Pill> },
            { label: "Priority", node: <Pill tone={PRIORITY_TONE[query.priority]}>{PRIORITY_LABEL[query.priority]}</Pill> },
            { label: "Received", node: <span className="text-[13px] text-ink">{timeAgo(query.createdAt)}</span> },
            { label: "Channel", node: <span className="text-[13px] text-ink">Website</span> },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl px-3.5 py-3"
              style={{ background: "rgba(245,242,236,0.6)", border: "1px solid var(--a-line-soft)" }}
            >
              <dt className="text-[11px] tracking-wide text-muted uppercase">{item.label}</dt>
              <dd className="mt-1.5">{item.node}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] text-muted">Move to</span>
          {STATUSES.filter((status) => status !== query.status).map((status) => (
            <Btn key={status} className="!h-8 !px-3" disabled={busy} onClick={() => onStatus(status)}>
              {STATUS_LABEL[status]}
            </Btn>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-[12.5px] font-medium text-ink">From</p>
          <a
            href={`mailto:${query.email}`}
            className="a-focus inline-flex items-center gap-2 text-[13.5px] text-olive-dark hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {query.email}
          </a>
          {query.phone && (
            <a
              href={`tel:${query.phone}`}
              className="a-focus ml-4 inline-flex items-center gap-2 text-[13.5px] text-olive-dark hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {query.phone}
            </a>
          )}
        </div>

        <div>
          <p className="mb-2 text-[12.5px] font-medium text-ink">Message</p>
          <div
            className="rounded-xl px-4 py-3.5 text-[14px] leading-relaxed whitespace-pre-wrap text-ink"
            style={{ background: "rgba(245,242,236,0.6)", border: "1px solid var(--a-line-soft)" }}
          >
            {query.message}
          </div>
        </div>

        <Label htmlFor="reply" label="Your reply / note" hint="Internal only — not emailed automatically">
          <Textarea
            id="reply"
            rows={5}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder="What you told them, and what happens next."
          />
        </Label>
      </div>
    </Modal>
  );
}

/* --------------------------------------------------------------------- page */

export default function AdminQueriesPage() {
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [open, setOpen] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const { busy, run } = useAction();

  const { data, loading, error, reload, setData } = useResource(
    () => api.queries.list(),
    "queries",
  );

  const rows = data ?? [];

  const counts = useMemo(
    () => ({
      all: rows.length,
      ...Object.fromEntries(
        STATUSES.map((value) => [value, rows.filter((row) => row.status === value).length]),
      ),
    }),
    [rows],
  );

  const visible = useMemo(
    () =>
      rows.filter(
        (row) =>
          (status === "all" || row.status === status) &&
          (priority === "all" || row.priority === priority) &&
          matchesSearch(row, search, ["name", "email", "subject", "message"]),
      ),
    [rows, status, priority, search],
  );

  function patchRow(id, changes) {
    setData(rows.map((row) => (row._id === id ? { ...row, ...changes } : row)));
    setOpen((prev) => (prev && prev._id === id ? { ...prev, ...changes } : prev));
  }

  async function changeStatus(id, next) {
    const ok = await run(() => api.queries.update(id, { status: next }));

    if (!ok) {
      toast.push("Could not update the status", "error");
      return;
    }

    patchRow(id, { status: next });
    toast.push(`Marked ${STATUS_LABEL[next].toLowerCase()}`);
  }

  async function saveReply(reply) {
    const target = open;
    const ok = await run(() => api.queries.update(target._id, { reply }));

    if (!ok) {
      toast.push("Could not save the note", "error");
      return;
    }

    patchRow(target._id, { reply });
    toast.push("Note saved");
  }

  async function remove() {
    const target = pendingDelete;
    const ok = await run(() => api.queries.remove(target._id));

    if (!ok) {
      toast.push("Could not delete the enquiry", "error");
      return;
    }

    setData(rows.filter((row) => row._id !== target._id));
    if (open?._id === target._id) setOpen(null);
    setPendingDelete(null);
    toast.push("Enquiry deleted", "info");
  }

  async function resolveAll() {
    const ids = visible.filter((row) => row.status !== "resolved").map((row) => row._id);

    if (ids.length === 0) return;

    const ok = await run(async () => {
      for (const id of ids) await api.queries.update(id, { status: "resolved" });
    });

    if (!ok) {
      toast.push("Could not mark them resolved", "error");
      return;
    }

    setData(rows.map((row) => (ids.includes(row._id) ? { ...row, status: "resolved" } : row)));
    toast.push(`${ids.length} marked resolved`);
  }

  const summary = [
    { key: "all", label: "All", value: counts.all },
    ...STATUSES.map((value) => ({ key: value, label: STATUS_LABEL[value], value: counts[value] })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <PageHead
        eyebrow="Inbox"
        title="Queries"
        description="Every enquiry sent through the contact form. Click a row to read it and move it along."
        actions={
          <Btn className="gap-1.5" onClick={resolveAll} disabled={busy || visible.length === 0}>
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            Mark all resolved
          </Btn>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summary.map((item) => {
          const active = status === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setStatus(item.key)}
              aria-pressed={active}
              className={`a-focus rounded-[14px] px-4 py-4 text-left transition-colors ${
                active ? "bg-olive text-cream" : "bg-[#fffdf9] hover:bg-sand/40"
              }`}
              style={{
                border: "1px solid var(--a-line)",
                boxShadow: active ? "var(--a-shadow-md)" : "var(--a-shadow)",
              }}
            >
              <p
                className={`a-display text-[26px] leading-none ${active ? "text-cream" : "text-ink"}`}
              >
                {item.value}
              </p>
              <p className={`mt-1.5 text-[12px] ${active ? "text-cream/75" : "text-muted"}`}>
                {item.label}
              </p>
            </button>
          );
        })}
      </div>

      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search enquiries" />
        <Dropdown
          value={priority}
          onChange={setPriority}
          options={["all", ...PRIORITIES]}
          label="Filter by priority"
          className="sm:w-44"
        />
        <p className="text-[13px] text-muted sm:ml-auto sm:shrink-0">
          {visible.length} of {rows.length}
        </p>
      </Toolbar>

      <Card className="overflow-hidden">
        {loading && <Loading rows={4} label="Loading enquiries" />}
        {!loading && error && <ErrorState error={error} onRetry={reload} />}

        {!loading && !error && rows.length === 0 && (
          <Empty
            icon={Inbox}
            title="No enquiries yet"
            sub="Messages sent from the /contact form will land here."
          />
        )}

        {!loading && !error && rows.length > 0 && visible.length === 0 && (
          <Empty
            icon={Inbox}
            title="Nothing matches those filters"
            action={
              <Btn
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                  setPriority("all");
                }}
              >
                Clear filters
              </Btn>
            }
          />
        )}

        {!loading && !error && visible.length > 0 && (
          <Table
            head={[
              { label: "From" },
              { label: "Subject" },
              { label: "Priority", hideBelow: "hidden md:table-cell" },
              { label: "Status", hideBelow: "hidden sm:table-cell" },
              { label: "Received", hideBelow: "hidden lg:table-cell" },
              { label: "" },
            ]}
          >
            {visible.map((query) => (
              <TR key={query._id} onClick={() => setOpen(query)}>
                <TD>
                  <p className="truncate text-[13.5px] font-medium text-ink">{query.name}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-muted">{query.email}</p>
                </TD>

                <TD className="max-w-[280px]">
                  <p className="truncate text-[13px] text-ink">{query.subject || "—"}</p>
                  <p className="mt-0.5 truncate text-[11.5px] text-muted">{query.message}</p>
                </TD>

                <TD className="hidden md:table-cell">
                  <Pill tone={PRIORITY_TONE[query.priority]}>
                    {PRIORITY_LABEL[query.priority]}
                  </Pill>
                </TD>

                <TD className="hidden sm:table-cell">
                  <Pill tone={STATUS_TONE[query.status]} dot>
                    {STATUS_LABEL[query.status]}
                  </Pill>
                </TD>

                <TD className="hidden text-[13px] text-muted lg:table-cell">
                  {timeAgo(query.createdAt)}
                </TD>

                <TD>
                  <div
                    className="flex items-center justify-end gap-1"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Btn className="!h-9 !px-3" onClick={() => setOpen(query)}>
                      <Reply className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Open</span>
                    </Btn>
                    <IBtn
                      label={`Delete enquiry from ${query.name}`}
                      onClick={() => setPendingDelete(query)}
                      className="hover:text-[#a0433d]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </IBtn>
                  </div>
                </TD>
              </TR>
            ))}
          </Table>
        )}
      </Card>

      {open && (
        <QueryDetail
          query={open}
          busy={busy}
          onClose={() => setOpen(null)}
          onStatus={(next) => changeStatus(open._id, next)}
          onSaveReply={saveReply}
        />
      )}

      <Confirm
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={remove}
        busy={busy}
        title="Delete enquiry"
        body={
          pendingDelete
            ? `The enquiry from ${pendingDelete.name} will be permanently deleted. This cannot be undone.`
            : ""
        }
      />

      <Card className="flex items-center gap-3 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-olive/12 text-olive">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-[12.5px] text-muted">
          Replies are saved as internal notes — nothing is emailed automatically.
        </p>
      </Card>
    </motion.div>
  );
}