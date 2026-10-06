import { deleteQuery, getQuery, updateQuery } from "@/lib/controller/query";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

/** GET / PUT / DELETE /api/v1/queries/:id  (admin) */
export const GET = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await getQuery(id));
});

export const PUT = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await updateQuery(id, await request.json()));
});

export const DELETE = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await deleteQuery(id));
});