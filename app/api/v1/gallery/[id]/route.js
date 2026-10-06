import { deleteImage, updateImage } from "@/lib/controller/gallery";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { ok } from "@/lib/utils/response";

/**
 * PUT    /api/v1/gallery/:id   edit title / caption / category / tags / featured
 * DELETE /api/v1/gallery/:id   removes the row and the Cloudinary file
 */
export const PUT = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await updateImage(id, await request.json()));
});

export const DELETE = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await deleteImage(id));
});