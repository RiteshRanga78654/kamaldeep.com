import connectDB from "@/lib/db/connect";

import Article from "@/lib/db/models/Article";
import { notFound } from "@/lib/utils/errors";
import { contains } from "@/lib/utils/search";
import { slugify, uniqueSlug } from "@/lib/utils/slug";
import {
  list,
  number,
  oneOf,
  paragraphs,
  require_,
  text,
} from "@/lib/utils/validate";

/** Same shape as `lib/controller/project.js` — that is the point. */

const SORT_OPTIONS = {
  newest: { publishedAt: -1 },
  oldest: { publishedAt: 1 },
  title: { title: 1 },
  views: { views: -1 },
};

function readBody(body) {
  return {
    title: text(body.title, 200),
    category: text(body.category, 80),
    excerpt: text(body.excerpt, 600),

    coverImage: text(body.coverImage, 600),
    alt: text(body.alt, 200),

    content: paragraphs(body.content, 400),
    highlights: list(body.highlights, 12),

    readingTime: text(body.readingTime, 40) || "5 min read",
    status: oneOf(body.status, ["draft", "published"], "published"),
    views: number(body.views, 0),
  };
}

/* ------------------------------------------------------------- public read */

export async function listPublishedArticles({ category = "all" } = {}) {
  await connectDB();
  const filter = { status: "published" };
  if (category !== "all") filter.category = category;

  return Article.find(filter).sort(SORT_OPTIONS.newest).lean();
}

export async function findPublishedArticle(slug) {
  await connectDB();
  return Article.findOne({ slug, status: "published" }).lean();
}

/** Slugs only, for `generateStaticParams`. */
export async function publishedArticleSlugs() {
  await connectDB();
  const rows = await Article.find({ status: "published" })
    .select("slug")
    .sort({ publishedAt: -1 })
    .lean();

  return rows.map((row) => row.slug);
}

export async function listPublishedCategories() {
  await connectDB();
  const rows = await Article.distinct("category", { status: "published" });
  return rows.filter(Boolean).sort();
}

/** Called by the article page on the server, so a refresh re-counts as a view. */
export async function recordView(slug) {
  await connectDB();
  await Article.updateOne({ slug }, { $inc: { views: 1 } });
}

/* --------------------------------------------------------------- admin read */

export async function listArticles({ status = "all", category = "all", search = "" } = {}) {
  await connectDB();
  const filter = {};

  if (status !== "all") filter.status = status;
  if (category !== "all") filter.category = category;

  const term = contains(search, ["title", "category", "excerpt"]);
  if (term) Object.assign(filter, term);

  return Article.find(filter).sort(SORT_OPTIONS.newest).lean();
}

export async function listAdminCategories() {
  await connectDB();
  const rows = await Article.distinct("category");
  return rows.filter(Boolean).sort();
}

/* ------------------------------------------------------------------ writes */

export async function createArticle(body) {
  await connectDB();
  const title = require_(body.title, "Title");
  const base = slugify(body.slug || title);

  const slug = await uniqueSlug(base, (candidate) =>
    Article.exists({ slug: candidate }).then(Boolean),
  );

  const article = await Article.create({
    ...readBody(body),
    title,
    slug,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
  });

  return article.toObject();
}

export async function updateArticle(id, body) {
  await connectDB();
  const article = await Article.findById(id);
  if (!article) throw notFound("Article not found");

  if (body.slug && slugify(body.slug) !== article.slug) {
    const wanted = slugify(body.slug);
    article.slug = await uniqueSlug(wanted, (candidate) =>
      Article.exists({ slug: candidate, _id: { $ne: id } }).then(Boolean),
    );
  }

  // First publish sets the date; later edits must not move it.
  if (body.status === "published" && article.status !== "published") {
    article.publishedAt = new Date();
  }

  Object.assign(article, readBody({ ...body, status: body.status ?? article.status }));

  await article.save();

  return article.toObject();
}

export async function deleteArticle(id) {
  await connectDB();
  const article = await Article.findByIdAndDelete(id);
  if (!article) throw notFound("Article not found");

  return { id: article.id };
}

/* -------------------------------------------------------- article page nav */

export async function relatedArticles(slug, count = 3) {
  await connectDB();
  const current = await Article.findOne({ slug }).lean();
  if (!current) return [];

  const others = await Article.find({ _id: { $ne: current._id }, status: "published" })
    .sort(SORT_OPTIONS.newest)
    .lean();

  const sameCategory = others.filter((article) => article.category === current.category);
  const rest = others.filter((article) => article.category !== current.category);

  return [...sameCategory, ...rest].slice(0, number(count, 3));
}

export async function adjacentArticles(slug) {
  await connectDB();
  const articles = await listPublishedArticles();

  const index = articles.findIndex((article) => article.slug === slug);
  if (index < 0) return { previous: null, next: null };

  return {
    previous: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}