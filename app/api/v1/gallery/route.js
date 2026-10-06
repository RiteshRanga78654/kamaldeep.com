import { listImages, uploadImages } from "@/lib/controller/gallery";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { badRequest } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

/**
 * GET  /api/v1/gallery?category=all&q=   Admin.
 * POST /api/v1/gallery                    Admin. multipart/form-data:
 *   files   one or more image files (field name `files`)
 *   title, caption, category, tags        shared across the batch
 */
export const GET = handler(async (request) => {
  await requireAdmin();

  const params = new URL(request.url).searchParams;

  return ok(
    await listImages({
      category: params.get("category") ?? "all",
      search: params.get("q") ?? "",
    }),
  );
});

export const POST = handler(async (request) => {
  await requireAdmin();

  const form = await request.formData();

  const files = form.getAll("files").filter((entry) => entry && entry.size > 0);
  if (files.length === 0) throw badRequest("Choose at least one image to upload");

  const result = await uploadImages(files, {
    title: form.get("title"),
    caption: form.get("caption"),
    category: form.get("category"),
    tags: form.get("tags"),
  });

  // Nothing went up but something was rejected — surface the reason.
  if (result.created.length === 0) {
    return ok(result, 422);
  }

  return ok(result, 201);
});