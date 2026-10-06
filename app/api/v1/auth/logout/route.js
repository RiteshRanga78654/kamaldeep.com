import { logout } from "@/lib/controller/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

export const POST = handler(async () => ok(await logout()));