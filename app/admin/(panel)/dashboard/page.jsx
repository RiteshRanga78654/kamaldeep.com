"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Clock,
  CloudOff,
  FileText,
  Images,
  MessageSquare,
  Plus,
  TrendingUp,
} from "lucide-react";
import { AreaChart, Donut, Progress, Spark } from "@/components/admin/charts";
import { api, useResource } from "@/components/admin/api";
import {
  Btn,
  Card,
  CardHead,
  Empty,
  ErrorState,
  Loading,
  PageHead,
  Pill,
  PRIORITY_LABEL,
  PRIORITY_TONE,
  STATUS_LABEL,
  STATUS_TONE,
  formatDate,
  timeAgo,
  useToast,
} from "@/components/admin/ui";

/**
 * Overview.
 *
 * Every figure here comes from GET /api/v1/stats, which is nothing but counts
 * and aggregations over the same collections the tables behind this screen
 * edit. There are no placeholder numbers, so the Overview can never quietly
 * disagree with the rest of the panel.
 */

const RANGES = { label: "30 days", days: 30 };

const grid = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const PIE_COLORS = ["#5C6647", "#C6A653", "#D9A9A0", "#4A5339", "#6E695E", "#8A8377"];

const STATUS_COLORS = { published: "#5C6647", draft: "#C6A653" };

const QUERY_COLORS = { new: "#B4504A", progress: "#C6A653", resolved: "#5C6647" };

/* --------------------------------------------------------------- small bits */

function Stat({ icon: Icon, label, value, since, accent }) {
  return (
    <Card lift className="relative overflow-hidden p-5">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-40"
        style={{ background: `radial-gradient(90% 70% at 50% 0%, ${accent}1f, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}18`, color: accent }}
        >
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        {since > 0 && (
          <Pill tone="olive">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />+{since}
          </Pill>
        )}
      </div>

      <div className="relative mt-4">
        <p className="a-display text-[30px] leading-none text-ink">{value.toLocaleString()}</p>
        <p className="mt-1.5 text-[13px] text-muted">{label}</p>
      </div>

      <p className="relative mt-3 text-[11.5px] text-muted">+{since} in last {RANGES.label}</p>
    </Card>
  );
}

function Activity({ items, empty }) {
  if (items.length === 0) return <p className="px-5 py-8 text-center text-[13px] text-muted">{empty}</p>;

  return (
    <div className="divide-y" style={{ borderColor: "var(--a-line-soft)" }}>
      {items.map((item) => (
        <div key={item.id ?? item._id} className="px-5 py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-medium text-ink">{item.label}</p>
              <p className="mt-0.5 truncate text-[12px] text-muted">{item.note}</p>
            </div>
            <Pill tone={item.tone}>{item.status}</Pill>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {item.when}
          </p>
        </div>
      ))}
    </div>
  );
}

function NeedsAttention({ count, queries }) {
  const firstQuery = queries[0];
  const inbox = firstQuery
    ? [
        {
          id: firstQuery._id,
          label: firstQuery.name,
          note: firstQuery.subject || firstQuery.email,
          tone: PRIORITY_TONE[firstQuery.priority],
          status: PRIORITY_LABEL[firstQuery.priority],
          when: timeAgo(firstQuery.createdAt),
        },
        ...queries.slice(1),
      ]
    : queries;

  return (
    <Card className="overflow-hidden">
      <CardHead
        title="Needs attention"
        sub={
          count > 0
            ? `${count} ${count === 1 ? "enquiry" : "enquiries"} still marked new`
            : "Every enquiry has been picked up"
        }
        right={
          <Link href="/admin/queries">
            <Btn className="!h-9 !px-3">
              Inbox
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Btn>
          </Link>
        }
      />
      <Activity items={inbox} empty="No open enquiries. Nice." />
    </Card>
  );
}

const QUICK = [
  { label: "Write a new article", icon: FileText, href: "/admin/articles" },
  { label: "Add a case study", icon: Briefcase, href: "/admin/projects" },
  { label: "Upload gallery assets", icon: Images, href: "/admin/gallery" },
  { label: "Read enquiries", icon: MessageSquare, href: "/admin/queries" },
];

/* -------------------------------------------------------------------- page */

export default function DashboardPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useResource(() => api.stats(), "overview");

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHead label="Dashboard" title="Overview" sub="Loading your numbers…" />
        <Card>
          <Loading rows={6} label="Loading overview" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHead label="Dashboard" title="Overview" />
        <Card>
          <ErrorState error={error} onRetry={reload} />
        </Card>
      </div>
    );
  }

  const { totals, last30Days, breakdowns, trends, topArticles, recent, storage } = data;

  const querySegments = breakdowns.queryStatus.map((row, i) => ({
    label: STATUS_LABEL[row.label] ?? row.label,
    value: row.value,
    color: QUERY_COLORS[row.label] ?? PIE_COLORS[i % PIE_COLORS.length],
  }));

  const articleSegments = breakdowns.articleStatus.map((row) => ({
    label: STATUS_LABEL[row.label] ?? row.label,
    value: row.value,
    color: STATUS_COLORS[row.label] ?? "#6E695E",
  }));

  const queryTrend = trends.queries.map((point) => point.count);
  const projectTrend = trends.projects.map((point) => point.count);

  const recentQueries = recent.queries.map((q) => ({
    id: q._id,
    label: q.name,
    note: q.subject || q.email,
    tone: STATUS_TONE[q.status],
    status: STATUS_LABEL[q.status] ?? q.status,
    when: timeAgo(q.createdAt),
  }));

  const recentArticles = recent.articles.map((a) => ({
    id: a._id,
    label: a.title,
    note: `${a.category || "Uncategorised"} · ${a.views.toLocaleString()} views`,
    tone: STATUS_TONE[a.status],
    status: STATUS_LABEL[a.status] ?? a.status,
    when: formatDate(a.updatedAt),
  }));

  const recentProjects = recent.projects.map((p) => ({
    id: p._id,
    label: p.title,
    note: p.client || p.category || "—",
    tone: STATUS_TONE[p.status],
    status: STATUS_LABEL[p.status] ?? p.status,
    when: formatDate(p.updatedAt),
  }));

  const queryTotal = querySegments.reduce((sum, segment) => sum + segment.value, 0);
  const articleTotal = articleSegments.reduce((sum, segment) => sum + segment.value, 0);

  const isEmpty =
    totals.projects + totals.articles + totals.images + totals.queries === 0;

  return (
    <motion.div variants={grid} initial="hidden" animate="show" className="space-y-6 md:space-y-7">
      <motion.div variants={rise}>
        <PageHead
          label="Dashboard"
          title="Overview"
          sub="What is live, what is waiting, and what has moved in the last 30 days."
          actions={
            <>
              <Btn onClick={reload} className="gap-1.5">
                Refresh
              </Btn>
              <Link href="/admin/articles">
                <Btn variant="primary" className="gap-1.5">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  New article
                </Btn>
              </Link>
            </>
          }
        />
      </motion.div>

      {isEmpty && (
        <motion.div variants={rise}>
          <Card className="p-5">
            <Empty
              icon={FileText}
              title="Nothing here yet"
              sub="Add your first case study or article and this page will start filling up."
              action={
                <Link href="/admin/projects">
                  <Btn variant="primary">Add a project</Btn>
                </Link>
              }
            />
          </Card>
        </motion.div>
      )}

      <motion.div variants={rise} className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        <Stat
          icon={Briefcase}
          label="Projects"
          value={totals.projects}
          since={last30Days.projects}
          accent="#5C6647"
        />
        <Stat
          icon={FileText}
          label="Articles"
          value={totals.articles}
          since={last30Days.articles}
          accent="#C6A653"
        />
        <Stat
          icon={Images}
          label="Gallery images"
          value={totals.images}
          since={last30Days.images}
          accent="#4A5339"
        />
        <Stat
          icon={MessageSquare}
          label="Enquiries"
          value={totals.queries}
          since={last30Days.queries}
          accent="#B4504A"
        />
      </motion.div>

      <motion.div variants={rise} className="grid gap-4 sm:gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden">
          <CardHead
            title="Enquiries received"
            sub={`Last ${RANGES.label}`}
            right={
              <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <span className="h-2 w-2 rounded-full bg-olive" aria-hidden="true" />
                {queryTrend.reduce((sum, n) => sum + n, 0)} total
              </span>
            }
          />
          <div className="px-5 py-5">
            <AreaChart data={queryTrend} labels={trends.queries.map((p) => p.label)} />
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHead title="Enquiry status" sub="How the inbox is split" />
          <div className="px-5 py-6">
            {queryTotal > 0 ? (
              <Donut segments={querySegments} />
            ) : (
              <p className="py-10 text-center text-[13px] text-muted">No enquiries yet</p>
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={rise} className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHead title="Article status" sub="Published vs draft" />
          <div className="px-5 py-6">
            {articleTotal > 0 ? (
              <>
                <Donut segments={articleSegments} />
                <p className="mt-5 text-center text-[12.5px] text-muted">
                  <span className="font-medium text-ink">{totals.articlesPublished}</span> live ·{" "}
                  <span className="font-medium text-ink">
                    {totals.articles - totals.articlesPublished}
                  </span>{" "}
                  draft
                </p>
              </>
            ) : (
              <p className="py-10 text-center text-[13px] text-muted">No articles yet</p>
            )}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHead title="Gallery by category" sub="How the library splits" />
          <div className="px-5 py-6">
            {breakdowns.galleryCategory.length > 0 ? (
              <Progress
                items={breakdowns.galleryCategory.map((row, i) => ({
                  label: row.label,
                  value: row.value,
                  color: PIE_COLORS[i % PIE_COLORS.length],
                }))}
              />
            ) : (
              <p className="py-10 text-center text-[13px] text-muted">Nothing uploaded yet</p>
            )}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHead title="Most read articles" sub="All-time views" />
          <div className="px-5 py-6">
            {topArticles.length > 0 ? (
              <Progress
                items={topArticles.map((row, i) => ({
                  label: row.label,
                  value: row.value,
                  color: PIE_COLORS[i % PIE_COLORS.length],
                }))}
              />
            ) : (
              <p className="py-10 text-center text-[13px] text-muted">No views recorded yet</p>
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={rise} className="grid gap-4 sm:gap-5 xl:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHead
            title="Recent articles"
            right={
              <Link href="/admin/articles">
                <Btn className="!h-9 !px-3">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Btn>
              </Link>
            }
          />
          <Activity items={recentArticles} empty="No articles yet" />
        </Card>

        <Card className="overflow-hidden">
          <CardHead
            title="Recent projects"
            right={
              <Link href="/admin/projects">
                <Btn className="!h-9 !px-3">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Btn>
              </Link>
            }
          />
          <Activity items={recentProjects} empty="No projects yet" />
        </Card>

        <div className="space-y-4 sm:space-y-5">
          <NeedsAttention count={totals.queriesOpen} queries={recentQueries.slice(0, 3)} />

          <Card className="overflow-hidden">
            <CardHead title="Quick actions" />
            <div className="space-y-2 px-4 py-4">
              {QUICK.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl bg-cream/60 px-3.5 py-3 text-[13.5px] text-ink transition-colors hover:bg-sand/50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-olive/10 text-olive">
                    <action.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={rise} className="grid gap-4 sm:gap-5 lg:grid-cols-[auto_1fr]">
        <Card className="flex items-center gap-4 px-5 py-4">
          {storage.cloudinaryConfigured ? (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-olive/12 text-olive">
                <Images className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-ink">Cloudinary connected</p>
                <p className="text-[11.5px] text-muted">
                  {totals.images} {totals.images === 1 ? "image" : "images"} stored
                </p>
              </div>
            </>
          ) : (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C6A653]/15 text-[#8a7433]">
                <CloudOff className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13.5px] font-medium text-ink">Cloudinary not set up</p>
                <p className="text-[11.5px] text-muted">Add the CLOUDINARY_* keys to enable uploads</p>
              </div>
            </>
          )}
        </Card>

        <Card className="flex items-center gap-4 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-[#8a7433]">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium text-ink">
              {projectTrend.reduce((sum, n) => sum + n, 0)} projects added in the last {RANGES.label}
            </p>
            <div className="mt-1.5 flex items-end gap-2">
              <Spark data={projectTrend} color="#5C6647" width={220} height={26} />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.p
        variants={rise}
        onClick={async () => {
          await reload();
          toast.push("Refreshed");
        }}
        className="flex cursor-pointer items-center gap-2 pb-2 text-[12px] text-muted"
      >
        <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        Numbers come straight from the database — click to refresh.
      </motion.p>
    </motion.div>
  );
}