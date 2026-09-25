import { getBlogs, getBlogBySlug, getCategories } from "@/lib/store";

export async function fetchBlogs() {
  return getBlogs();
}

export async function fetchBlogBySlug(slug) {
  return getBlogBySlug(slug);
}

export async function fetchRelatedBlogs(slug, count = 3) {
  const blogs = getBlogs();
  const current = blogs.find((b) => b.slug === slug);
  if (!current) return blogs.slice(0, count);
  return blogs
    .filter((b) => b.slug !== slug && b.category === current.category)
    .concat(blogs.filter((b) => b.slug !== slug && b.category !== current.category))
    .slice(0, count);
}

export async function fetchCategories() {
  return getCategories();
}