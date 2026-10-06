import "@/lib/db/connect";

import Gallery from "@/lib/db/models/Gallery";
import { notFound } from "@/lib/utils/errors";
import { contains } from "@/lib/utils/search";
import { removeImage, uploadImage } from "@/lib/utils/upload";
import { bool, list, text } from "@/lib/utils/validate";

/**
 * Gallery is the only resource that owns files: a row here points at an image
 * on Cloudinary, so deleting one has to delete the file too.
 */

export const GALLERY_FOLDER = "kamaldeep/gallery";

const MAX_FILES_PER_UPLOAD = 20;

function readBody(body) {
  return {
    title: text(body.title, 200),
    caption: text(body.caption, 600),
    category: text(body.category, 60) || "Events",
    tags: list(body.tags, 12),
    featured: bool(body.featured),
  };
}

/* ------------------------------------------------------------- public read */

export async function listPublishedImages({ category = "all", featuredOnly = false } = {}) {
  const filter = {};

  if (category !== "all") filter.category = category;
  if (featuredOnly) filter.featured = true;

  return Gallery.find(filter).sort({ createdAt: -1 }).lean();
}

export async function listGalleryCategories() {
  const rows = await Gallery.distinct("category");
  return rows.filter(Boolean).sort();
}

/* --------------------------------------------------------------- admin read */

export async function listImages({ category = "all", search = "" } = {}) {
  const filter = {};

  if (category !== "all") filter.category = category;

  const term = contains(search, ["title", "caption", "category", "tags"]);
  if (term) Object.assign(filter, term);

  return Gallery.find(filter).sort({ createdAt: -1 }).lean();
}

/* ------------------------------------------------------------------ upload */

/**
 * Uploads every file in `files` and creates one row per image.
 *
 * All files go up first and only then are the rows written, so a failed
 * upload never leaves half a gallery behind. `title` / `category` are shared
 * across the batch because the admin picks them once for a multi-select.
 */
export async function uploadImages(files, options = {}) {
  if (!files || files.length === 0) {
    return { created: [], failed: [] };
  }

  if (files.length > MAX_FILES_PER_UPLOAD) {
    return {
      created: [],
      failed: [{ name: "", error: `You can upload up to ${MAX_FILES_PER_UPLOAD} images at a time` }],
    };
  }

  const shared = readBody(options);
  const created = [];
  const failed = [];

  for (const file of files) {
    try {
      const uploaded = await uploadImage(file, GALLERY_FOLDER);

      const row = await Gallery.create({
        ...shared,
        title: shared.title || file.name.replace(/\.[^.]+$/, ""),
        url: uploaded.url,
        publicId: uploaded.publicId,
        width: uploaded.width,
        height: uploaded.height,
        bytes: uploaded.bytes,
      });

      created.push(row.toObject());
    } catch (error) {
      failed.push({ name: file.name, error: error.message });
    }
  }

  return { created, failed };
}

/** Single image, no gallery row — used for project and article cover images. */
export async function uploadOne(file, folder = "kamaldeep/covers") {
  return uploadImage(file, folder);
}

/* ------------------------------------------------------------------ writes */

export async function updateImage(id, body) {
  const image = await Gallery.findById(id);
  if (!image) throw notFound("Image not found");

  Object.assign(image, readBody(body));

  await image.save();

  return image.toObject();
}

/** Removes the row *and* the Cloudinary file it points at. */
export async function deleteImage(id) {
  const image = await Gallery.findByIdAndDelete(id);
  if (!image) throw notFound("Image not found");

  await removeImage(image.publicId);

  return { id: image.id };
}

/** Bulk delete — used by the gallery page's select-and-remove flow. */
export async function deleteImages(ids) {
  const images = await Gallery.find({ _id: { $in: ids } });

  await Promise.all(images.map((image) => removeImage(image.publicId)));

  await Gallery.deleteMany({ _id: { $in: images.map((image) => image._id) } });

  return { deleted: images.length };
}