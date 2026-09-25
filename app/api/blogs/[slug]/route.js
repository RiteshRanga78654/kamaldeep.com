import { getBlogBySlug, saveBlog, deleteBlog } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const current = getBlogBySlug(slug);
  if (!current) return Response.json({ error: "Blog not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const blog = {
    ...current,
    ...body,
    slug: body.slug && String(body.slug).trim() ? String(body.slug).trim().toLowerCase().replace(/\s+/g, "-") : current.slug,
    title: body.title != null ? String(body.title).trim() : current.title,
  };
  saveBlog(blog);
  return Response.json({ blog });
}

export async function DELETE(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const current = getBlogBySlug(slug);
  if (!current) return Response.json({ error: "Blog not found" }, { status: 404 });
  deleteBlog(slug);
  return Response.json({ ok: true });
}