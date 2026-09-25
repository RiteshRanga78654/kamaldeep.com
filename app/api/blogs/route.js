import { getBlogs, saveBlog } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function GET(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ blogs: getBlogs() });
}

export async function POST(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return Response.json({ error: "Title and slug are required" }, { status: 400 });
    }
    const existing = getBlogs().find((b) => b.slug === body.slug);
    if (existing) {
      return Response.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }
    const blog = {
      slug: String(body.slug).trim().toLowerCase().replace(/\s+/g, "-"),
      title: String(body.title).trim(),
      category: body.category || "Perspective",
      date: body.date || new Date().toISOString().slice(0, 10),
      readingTime: body.readingTime || "5 min read",
      excerpt: body.excerpt || "",
      content: Array.isArray(body.content) ? body.content : [],
      coverImage: body.coverImage || null,
    };
    saveBlog(blog);
    return Response.json({ blog }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}