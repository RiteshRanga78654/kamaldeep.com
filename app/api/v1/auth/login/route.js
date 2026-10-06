import { login } from "@/lib/controller/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

export const POST = handler(async (request) => {
  const body = await request.json();

  return ok(await login(body));
});