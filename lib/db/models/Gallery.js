import mongoose from "mongoose";

/**
 * A row in the gallery. `url` is what the site renders; `publicId` is the
 * Cloudinary handle we need in order to delete the file later.
 */
const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true },
    caption: { type: String, default: "" },
    category: { type: String, default: "Events", trim: true },
    tags: { type: [String], default: [] },

    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bytes: { type: Number, default: 0 },

    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);