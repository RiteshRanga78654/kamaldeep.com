import fs from "node:fs";
import path from "node:path";
import { requestHasSession } from "@/lib/auth";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export async function POST(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !file.arrayBuffer) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const name = String(file.name || "upload");
    const mime = file.type || "";
    if (!ALLOWED.has(mime)) {
      return Response.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "public", "uploads", "gallery");
    fs.mkdirSync(dir, { recursive: true });

    const ext = EXT[mime] || path.extname(name) || ".jpg";
    const safeBase = path
      .basename(name, path.extname(name))
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 60) || "image";
    const filename = `${Date.now()}-${safeBase}${ext}`;
    fs.writeFileSync(path.join(dir, filename), bytes);

    return Response.json({ url: `/uploads/gallery/${filename}` }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}