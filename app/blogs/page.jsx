import BlogIndex from "./BlogIndex";
import { listPublishedArticles } from "@/lib/controller/article";

/**
 * Blog listing.
 *
 * Loads published articles on the server so the titles and excerpts are in the
 * HTML for search engines, then hands them to `<BlogIndex />` for the
 * category filter, search box and "load more" button.
 */
export const metadata = {
  title: "Latest Blog & Article",
  description:
    "Practical writing on content, community and turning an audience into a business — written for creators who would rather build something durable than chase a trend.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await listPublishedArticles();

  return <BlogIndex posts={posts} />;
}