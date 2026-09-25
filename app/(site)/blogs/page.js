import { fetchBlogs, fetchCategories } from "@/lib/api/blogs";
import { BlogsExplorer } from "@/components/Blogs/BlogsExplorer";
import { profile } from "@/lib/data/profile";

export const metadata = {
  title: "Insights & Perspectives — " + profile.name,
  description:
    "Perspectives on real estate ecosystems, executive leadership, and strategic market expansion by " + profile.name + ".",
  alternates: { canonical: "/blogs" },
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([fetchBlogs(), fetchCategories()]);

  return (
    <main style={{ backgroundColor: "#fbf9f5", minHeight: "100vh", color: "#1c1917" }}>
      <BlogsExplorer posts={posts} categories={categories} />
    </main>
  );
}