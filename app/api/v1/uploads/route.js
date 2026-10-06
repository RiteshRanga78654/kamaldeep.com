import { uploadOne } from "@/lib/controller/gallery";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { badRequest } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

/**
 * POST /api/v1/uploads   Admin. multipart/form-data with a single `file`.
 *
 * Used for cover images — it uploads to Cloudinary and returns the metadata
 * without creating a gallery row, so the caller can paste `url` into a
 * project's or article's form.
 */
export const POST = handler(async (request) => {
  await requireAdmin();

  const form = await request.formData();
  const file = form.get("file");

  if (!file || typeof file.arrayBuffer !== "function") throw badRequest("Choose a file to upload");

  return ok(await uploadOne(file, form.get("folder") || "kamaldeep/covers"), 201);
});