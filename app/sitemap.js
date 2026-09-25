import { profile } from "@/lib/data/profile";
import { fetchBlogs } from "@/lib/api/blogs";

export default async function sitemap() {
  const posts = await fetchBlogs();
  const base = profile.metadataBase;

  const staticRoutes = ["", "/blogs", "/gallery"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blogs/${post.slug}`,
    lastModified: post.date,
  }));

  return [...staticRoutes, ...blogRoutes];
}
