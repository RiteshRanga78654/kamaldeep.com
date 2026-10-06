import { v2 as cloudinary } from "cloudinary";
import { Readable } from "node:stream";
import { badRequest } from "@/lib/utils/errors";

/**
 * Image storage. Everything is uploaded from the server so the API secret
 * never reaches the browser.
 *
 * Until CLOUDINARY_* is filled in `.env.local`, uploads fail with a clear
 * message instead of a Cloudinary SDK stack trace.
 */

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

export const isCloudinaryReady = Boolean(cloudName && apiKey && apiSecret);

const NOT_CONFIGURED =
  "Cloudinary is not set up yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local, then restart the dev server.";

const ALLOWED = /^image\/(jpeg|png|webp|avif|gif)$/;
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * @param {File} file          a File from `formData()`
 * @param {string} folder      Cloudinary folder, e.g. "kamaldeep/gallery"
 * @returns {Promise<{ url: string, publicId: string, width: number, height: number, bytes: number, format: string }>}
 */
export async function uploadImage(file, folder = "kamaldeep") {
  if (!isCloudinaryReady) throw badRequest(NOT_CONFIGURED);
  if (!file || typeof file.arrayBuffer !== "function") {
    throw badRequest("No file received");
  }
  if (file.size === 0) throw badRequest("That file is empty");
  if (file.size > MAX_BYTES) throw badRequest("Images must be under 8 MB");
  if (!ALLOWED.test(file.type)) {
    throw badRequest("Only JPG, PNG, WebP, AVIF or GIF images are allowed");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, res) => {
        if (error) return reject(error);
        resolve(res);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width ?? 0,
    height: result.height ?? 0,
    bytes: result.bytes ?? file.size,
    format: result.format ?? "",
  };
}

/**
 * Removes the file from Cloudinary as well as the database row.
 *
 * A record can outlive its file (uploaded before publicId was stored, or the
 * asset was removed by hand), so a missing publicId or a Cloudinary error is
 * not treated as a failure — the row is still worth deleting.
 */
export async function removeImage(publicId) {
  if (!publicId || !isCloudinaryReady) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.warn("[cloudinary] could not delete", publicId, error.message);
  }
}