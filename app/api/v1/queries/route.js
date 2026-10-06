import { createQuery, listQueries } from "@/lib/controller/query";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { created, ok } from "@/lib/utils/response";

/**
 * GET  /api/v1/queries   Admin only — the contact inbox.
 * POST /api/v1/queries   Public. This is what the /contact form posts to.
 */
export const GET = handler(async (request) => {
  await requireAdmin();

  const params = new URL(request.url).searchParams;

  return ok(
    await listQueries({
      status: params.get("status") ?? "all",
      priority: params.get("priority") ?? "all",
      search: params.get("q") ?? "",
    }),
  );
});

export const POST = handler(async (request) => created(await createQuery(await request.json())));