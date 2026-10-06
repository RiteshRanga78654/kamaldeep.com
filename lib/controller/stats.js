import "@/lib/db/connect";

import Article from "@/lib/db/models/Article";
import Gallery from "@/lib/db/models/Gallery";
import Project from "@/lib/db/models/Project";
import Query from "@/lib/db/models/Query";

/**
 * Everything the dashboard Overview needs, in one request.
 *
 * Nothing here is made up: every number comes from a count or an aggregation,
 * so the Overview can never quietly disagree with the tables behind it.
 */

const DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Counts rows per day for the last `DAYS` days, oldest first. */
async function dailySeries(model, extraFilter = {}) {
  const since = new Date(Date.now() - (DAYS - 1) * DAY_MS);

  const rows = await model.aggregate([
    { $match: { createdAt: { $gte: since }, ...extraFilter } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const counts = new Map(rows.map((row) => [row._id, row.count]));
  const today = startOfDay(new Date());

  return Array.from({ length: DAYS }, (_, offset) => {
    const day = new Date(today.getTime() - (DAYS - 1 - offset) * DAY_MS);

    return {
      date: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      count: counts.get(day.toISOString().slice(0, 10)) ?? 0,
    };
  });
}

async function countBy(model, field, filter = {}) {
  const rows = await model.aggregate([
    { $match: filter },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return rows
    .filter((row) => row._id)
    .map((row) => ({ label: row._id, value: row.count }));
}

export async function getOverview() {
  const since = new Date(Date.now() - DAYS * DAY_MS);

  const [
    projectsTotal,
    projectsPublished,
    articlesTotal,
    articlesPublished,
    imagesTotal,
    imagesThisMonth,
    queriesTotal,
    queriesOpen,
    queriesThisMonth,
    articlesThisMonth,
    projectsThisMonth,
    recentArticles,
    recentProjects,
    recentQueries,
    openByStatus,
    articlesByStatus,
    imagesByCategory,
    topArticles,
    queryTrend,
    articleTrend,
    projectTrend,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: "published" }),

    Article.countDocuments(),
    Article.countDocuments({ status: "published" }),

    Gallery.countDocuments(),
    Gallery.countDocuments({ createdAt: { $gte: since } }),

    Query.countDocuments(),
    Query.countDocuments({ status: "new" }),
    Query.countDocuments({ createdAt: { $gte: since } }),

    Article.countDocuments({ createdAt: { $gte: since } }),
    Project.countDocuments({ createdAt: { $gte: since } }),

    Article.find().sort({ updatedAt: -1 }).limit(5).select("title slug category status views updatedAt").lean(),
    Project.find().sort({ updatedAt: -1 }).limit(5).select("title slug client status updatedAt").lean(),
    Query.find().sort({ createdAt: -1 }).limit(5).select("name email subject status priority createdAt").lean(),

    countBy(Query, "status"),
    countBy(Article, "status"),
    countBy(Gallery, "category"),

    Article.find({ status: "published" }).sort({ views: -1 }).limit(5).select("title views").lean(),

    dailySeries(Query),
    dailySeries(Article),
    dailySeries(Project),
  ]);

  return {
    window: { days: DAYS, since },

    totals: {
      projects: projectsTotal,
      projectsPublished,
      articles: articlesTotal,
      articlesPublished,
      images: imagesTotal,
      queries: queriesTotal,
      queriesOpen,
    },

    last30Days: {
      projects: projectsThisMonth,
      articles: articlesThisMonth,
      images: imagesThisMonth,
      queries: queriesThisMonth,
    },

    breakdowns: {
      queryStatus: openByStatus,
      articleStatus: articlesByStatus,
      galleryCategory: imagesByCategory,
    },

    trends: {
      queries: queryTrend,
      articles: articleTrend,
      projects: projectTrend,
    },

    topArticles: topArticles.map((article) => ({ label: article.title, value: article.views })),

    recent: {
      articles: recentArticles,
      projects: recentProjects,
      queries: recentQueries,
    },

    storage: { cloudinaryConfigured: Boolean(process.env.CLOUDINARY_CLOUD_NAME) },
  };
}