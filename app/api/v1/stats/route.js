import { getOverview } from "@/lib/controller/stats";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

/** GET /api/v1/stats — the dashboard Overview, in one request. */
export const GET = handler(async () => {
  await requireAdmin();

  return ok(await getOverview());
});