import { updateQueryStatus, deleteQuery, getQueries } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  if (!body.status || !["read", "unread", "archived"].includes(body.status)) {
    return Response.json({ error: "status must be read, unread or archived" }, { status: 400 });
  }
  const updated = updateQueryStatus(id, body.status);
  if (!updated) return Response.json({ error: "Query not found" }, { status: 404 });
  return Response.json({ query: updated });
}

export async function DELETE(request, { params }) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const exists = getQueries().some((q) => q.id === id);
  if (!exists) return Response.json({ error: "Query not found" }, { status: 404 });
  deleteQuery(id);
  return Response.json({ ok: true });
}