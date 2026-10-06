import { createArticle, listArticles } from "@/lib/controller/article";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { created, ok } from "@/lib/utils/response";

/** GET / POST /api/v1/articles  (admin) */
export const GET = handler(async (request) => {
  await requireAdmin();

  const params = new URL(request.url).searchParams;

  const articles = await listArticles({
    status: params.get("status") ?? "all",
    category: params.get("category") ?? "all",
    search: params.get("q") ?? "",
  });

  return ok(articles);
});

export const POST = handler(async (request) => {
  await requireAdmin();

  return created(await createArticle(await request.json()));
});