import { getAllBlogs, getBlogBySlug, getRelatedBlogs, categories } from "@/lib/data/blogs";

export async function fetchBlogs() {
  return getAllBlogs();
}

export async function fetchBlogBySlug(slug) {
  return getBlogBySlug(slug);
}

export async function fetchRelatedBlogs(slug, count = 3) {
  return getRelatedBlogs(slug, count);
}

export async function fetchCategories() {
  return categories;
}
