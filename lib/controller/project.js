import connectDB from "@/lib/db/connect";

import Project from "@/lib/db/models/Project";
import { notFound } from "@/lib/utils/errors";
import { contains } from "@/lib/utils/search";
import { slugify, uniqueSlug } from "@/lib/utils/slug";
import {
  bool,
  list,
  number,
  oneOf,
  outcomes,
  paragraphs,
  require_,
  steps,
  text,
} from "@/lib/utils/validate";

/**
 * Projects are the reference implementation for every other resource: list →
 * filter → create → update → delete, all through the same three folders.
 */

const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  title: { title: 1 },
};

/** Turns a request body into exactly the fields the schema declares. */
function readBody(body) {
  return {
    title: text(body.title, 200),
    category: text(body.category, 80),
    client: text(body.client, 120),
    year: text(body.year, 20),
    duration: text(body.duration, 60),

    coverImage: text(body.coverImage, 600),
    gallery: list(body.gallery, 30),
    alt: text(body.alt, 200),

    excerpt: text(body.excerpt, 600),
    services: list(body.services, 20),
    overview: paragraphs(body.overview, 40),
    challenge: text(body.challenge, 4000),
    approach: steps(body.approach),
    outcomes: outcomes(body.outcomes),
    results: text(body.results, 4000),

    status: oneOf(body.status, ["draft", "published"], "published"),
    featured: bool(body.featured),
  };
}

/* ------------------------------------------------------------- public read */

export async function listPublishedProjects() {
  await connectDB();
  return Project.find({ status: "published" }).sort({ createdAt: -1 }).lean();
}

export async function findPublishedProject(slug) {
  await connectDB();
  return Project.findOne({ slug, status: "published" }).lean();
}

/** Slugs only, for `generateStaticParams`. */
export async function publishedProjectSlugs() {
  await connectDB();
  const rows = await Project.find({ status: "published" })
    .select("slug")
    .sort({ createdAt: -1 })
    .lean();

  return rows.map((row) => row.slug);
}

/* --------------------------------------------------------------- admin read */

export async function listProjects({ status = "all", category = "all", search = "" } = {}) {
  await connectDB();
  const filter = {};

  if (status !== "all") filter.status = status;
  if (category !== "all") filter.category = category;

  const term = contains(search, ["title", "category", "client", "excerpt"]);
  if (term) Object.assign(filter, term);

  return Project.find(filter).sort(SORT_OPTIONS.newest).lean();
}

export async function listCategories() {
  await connectDB();
  const rows = await Project.distinct("category");
  return rows.filter(Boolean).sort();
}

/* ------------------------------------------------------------------ writes */

export async function createProject(body) {
  await connectDB();
  const title = require_(body.title, "Title");
  const base = slugify(body.slug || title);

  const slug = await uniqueSlug(base, (candidate) =>
    Project.exists({ slug: candidate }).then(Boolean),
  );

  const project = await Project.create({ ...readBody(body), title, slug });

  return project.toObject();
}

export async function updateProject(id, body) {
  await connectDB();
  const project = await Project.findById(id);
  if (!project) throw notFound("Project not found");

  // Only touch the slug when one was sent, so saving a form without touching
  // the URL field cannot accidentally rename the page.
  if (body.slug && slugify(body.slug) !== project.slug) {
    const wanted = slugify(body.slug);
    project.slug = await uniqueSlug(wanted, (candidate) =>
      Project.exists({ slug: candidate, _id: { $ne: id } }).then(Boolean),
    );
  }

  Object.assign(project, readBody({ ...body, status: body.status ?? project.status }));

  await project.save();

  return project.toObject();
}

export async function deleteProject(id) {
  await connectDB();
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw notFound("Project not found");

  return { id: project.id };
}

/** Used by the detail page footer. Wraps around so the link always resolves. */
export async function nextPublishedProject(slug) {
  await connectDB();
  const published = await listPublishedProjects();
  if (published.length === 0) return null;

  const index = published.findIndex((project) => project.slug === slug);
  if (index < 0) return null;

  return published[(index + 1) % published.length];
}

/** Same category first, then anything else. */
export async function relatedProjects(slug, count = 3) {
  await connectDB();
  const current = await Project.findOne({ slug }).lean();
  if (!current) return [];

  const others = await Project.find({
    _id: { $ne: current._id },
    status: "published",
  })
    .sort({ createdAt: -1 })
    .lean();

  const sameCategory = others.filter((project) => project.category === current.category);
  const rest = others.filter((project) => project.category !== current.category);

  return [...sameCategory, ...rest].slice(0, number(count, 3));
}