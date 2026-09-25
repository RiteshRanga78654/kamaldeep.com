import { getGallery, saveGalleryItem, readStore, writeStore, makeId } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function GET(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ gallery: getGallery() });
}

export async function POST(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.src) {
      return Response.json({ error: "Image source (src) is required" }, { status: 400 });
    }
    const item = {
      id: makeId(),
      src: String(body.src).trim(),
      title: body.title ? String(body.title).trim() : "Untitled",
      caption: body.caption ? String(body.caption).trim() : "",
      category: body.category ? String(body.category).trim() : "General",
      tags: Array.isArray(body.tags) ? body.tags.map((t) => String(t).trim()).filter(Boolean) : [],
      featured: Boolean(body.featured),
      createdAt: body.createdAt || new Date().toISOString().slice(0, 10),
    };
    saveGalleryItem(item);

    const store = readStore();
    const categoriesSet = new Set([...store.categories, item.category].filter(Boolean));
    store.categories = [...categoriesSet];
    writeStore(store);

    return Response.json({ item }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}