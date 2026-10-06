import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

/** Lets the admin panel confirm the session is still valid on load. */
export const GET = handler(async () => ok(await requireAdmin()));