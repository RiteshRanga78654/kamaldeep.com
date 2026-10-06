import Article from "@/lib/db/models/Article";
import { deleteArticle, updateArticle } from "@/lib/controller/article";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { notFound } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

/** GET / PUT / DELETE /api/v1/articles/:id  (admin) */
export const GET = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  const article = await Article.findById(id).lean();
  if (!article) throw notFound("Article not found");

  return ok(article);
});

export const PUT = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await updateArticle(id, await request.json()));
});

export const DELETE = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await deleteArticle(id));
});