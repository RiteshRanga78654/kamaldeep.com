import { getPublishedBlogs, getPublishedBlogBySlug } from "@/lib/store";

export async function fetchBlogs() {
  return getPublishedBlogs();
}

export async function fetchBlogBySlug(slug) {
  return getPublishedBlogBySlug(slug);
}

export async function fetchRelatedBlogs(slug, count = 3) {
  const blogs = getPublishedBlogs();
  const current = blogs.find((b) => b.slug === slug);
  if (!current) return blogs.slice(0, count);
  return blogs
    .filter((b) => b.slug !== slug && b.category === current.category)
    .concat(blogs.filter((b) => b.slug !== slug && b.category !== current.category))
    .slice(0, count);
}

export async function fetchCategories() {
  const categories = new Set(getPublishedBlogs().map((blog) => blog.category).filter(Boolean));
  return ["All", ...categories];
}
