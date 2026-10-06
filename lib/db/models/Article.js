import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "", trim: true },
    excerpt: { type: String, default: "" },

    coverImage: { type: String, default: "" },
    alt: { type: String, default: "" },

    /** Body copy. One array entry per paragraph. */
    content: { type: [String], default: [] },
    /** Optional "Key takeaways" list shown mid-article. */
    highlights: { type: [String], default: [] },

    readingTime: { type: String, default: "5 min read" },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    views: { type: Number, default: 0 },

    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);