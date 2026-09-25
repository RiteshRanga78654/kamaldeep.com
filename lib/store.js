import fs from "node:fs";
import path from "node:path";
import { blogs as seedBlogs, categories } from "@/lib/data/blogs";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

const GALLERY_SEED = [
  {
    src: "/images/profile/kamal01/TKS05243.JPG",
    title: "Summit Address",
    caption: "Leading a panel discussion on scaling institutional real estate partnerships.",
    category: "Events",
    tags: ["Summit", "Leadership"],
    featured: true,
  },
  {
    src: "/images/profile/kamal01/TKS05249.JPG",
    title: "Closing Remarks",
    caption: "Wrapping up an executive dialogue on market expansion and strategy.",
    category: "Events",
    tags: ["Summit"],
    featured: false,
  },
  {
    src: "/images/profile/kamal01/TKS05223.JPG",
    title: "Industry Dialogue",
    caption: "An exchange with industry leaders on building trust-first partnerships.",
    category: "Events",
    tags: ["Networking"],
    featured: true,
  },
  {
    src: "/images/profile/kamal01/kamaldeep.png",
    title: "Portrait Study",
    caption: "A formal portrait from the studio series.",
    category: "Portraits",
    tags: ["Studio"],
    featured: false,
  },
  {
    src: "/images/profile/kamal01/kamal.png",
    title: "Executive Portrait",
    caption: "The working portrait used across leadership profiles.",
    category: "Portraits",
    tags: ["Studio"],
    featured: false,
  },
  {
    src: "/images/profile/kamal01/TKS05377.JPG",
    title: "Keynote Moment",
    caption: "Speaking to a room of founders and institutional partners.",
    category: "Events",
    tags: ["Keynote"],
    featured: false,
  },
  {
    src: "/images/profile/kamal01/industry.jpeg",
    title: "In the Field",
    caption: "On location during an industry engagement.",
    category: "Field Study",
    tags: ["Site Visit"],
    featured: false,
  },
  {
    src: "/images/blogs/ireed-events/01.jpg",
    title: "IREED Event Series",
    caption: "A glimpse from the IREED event series.",
    category: "Events",
    tags: ["IREED"],
    featured: false,
  },
  {
    src: "/images/blogs/ireed-events/13.png",
    title: "Weekend Intensive",
    caption: "An intensive working session with partner institutions.",
    category: "Workshops",
    tags: ["IREED"],
    featured: false,
  },
];

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildSeedStore() {
  const blogs = seedBlogs.map((b) => ({
    coverImage: b.coverImage || null,
    ...b,
  }));
  const gallery = GALLERY_SEED.map((g, i) => ({
    id: makeId(),
    createdAt: new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10),
    ...g,
  }));
  return { blogs, categories, gallery, queries: [] };
}

let MEMORY_STORE = null;

function ensureStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(buildSeedStore(), null, 2), "utf8");
    }
  } catch {
    // Read-only filesystem (e.g. Vercel serverless) — in-memory fallback is used.
  }
}

function loadStore() {
  if (MEMORY_STORE) return MEMORY_STORE;
  ensureStore();
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    MEMORY_STORE = JSON.parse(raw);
  } catch {
    MEMORY_STORE = buildSeedStore();
  }
  return MEMORY_STORE;
}

export function readStore() {
  return loadStore();
}

export function writeStore(store) {
  MEMORY_STORE = store;
  ensureStore();
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Non-persistent filesystem — data stays in memory for this instance.
  }
}

export const getCategories = () => readStore().categories;

export function getBlogs() {
  return readStore().blogs;
}

export function getBlogBySlug(slug) {
  return readStore().blogs.find((b) => b.slug === slug);
}

export function saveBlog(blog) {
  const store = readStore();
  const index = store.blogs.findIndex((b) => b.slug === blog.slug);
  if (index >= 0) store.blogs[index] = blog;
  else store.blogs.unshift(blog);
  writeStore(store);
  return blog;
}

export function deleteBlog(slug) {
  const store = readStore();
  store.blogs = store.blogs.filter((b) => b.slug !== slug);
  writeStore(store);
}

export function getGallery() {
  return readStore().gallery;
}

export function getGalleryItem(id) {
  return readStore().gallery.find((g) => g.id === id);
}

export function saveGalleryItem(item) {
  const store = readStore();
  const index = store.gallery.findIndex((g) => g.id === item.id);
  if (index >= 0) store.gallery[index] = item;
  else store.gallery.unshift(item);
  writeStore(store);
  return item;
}

export function deleteGalleryItem(id) {
  const store = readStore();
  store.gallery = store.gallery.filter((g) => g.id !== id);
  writeStore(store);
}

export function getQueries() {
  return readStore().queries;
}

export function addQuery(query) {
  const store = readStore();
  store.queries.unshift(query);
  writeStore(store);
  return query;
}

export function updateQueryStatus(id, status) {
  const store = readStore();
  const index = store.queries.findIndex((q) => q.id === id);
  if (index >= 0) {
    store.queries[index].status = status;
    writeStore(store);
    return store.queries[index];
  }
  return null;
}

export function deleteQuery(id) {
  const store = readStore();
  store.queries = store.queries.filter((q) => q.id !== id);
  writeStore(store);
}

export function getStats() {
  const store = readStore();
  const unread = store.queries.filter((q) => q.status !== "read" && q.status !== "archived").length;
  const categories = new Set(store.gallery.map((g) => g.category).filter(Boolean));
  return {
    blogs: store.blogs.length,
    gallery: store.gallery.length,
    queries: store.queries.length,
    unreadQueries: unread,
    galleryCategories: categories.size,
  };
}

export { makeId };