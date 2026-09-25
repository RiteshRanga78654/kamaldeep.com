import { getGalleryItem, saveGalleryItem, deleteGalleryItem } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const current = getGalleryItem(id);
  if (!current) return Response.json({ error: "Gallery item not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const item = { ...current, ...body, id };
  saveGalleryItem(item);
  return Response.json({ item });
}

export async function DELETE(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const current = getGalleryItem(id);
  if (!current) return Response.json({ error: "Gallery item not found" }, { status: 404 });
  deleteGalleryItem(id);
  return Response.json({ ok: true });
}