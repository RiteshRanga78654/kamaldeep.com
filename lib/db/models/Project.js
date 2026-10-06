import mongoose from "mongoose";

/** One step of "how it was built". Kept inline so the order is preserved. */
const ApproachStep = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  { _id: false },
);

/** One number on a case-study page, e.g. { value: "3×", label: "Enquiries" }. */
const Outcome = new mongoose.Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false },
);

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "", trim: true },
    client: { type: String, default: "", trim: true },
    year: { type: String, default: "", trim: true },
    duration: { type: String, default: "", trim: true },

    coverImage: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    alt: { type: String, default: "" },

    excerpt: { type: String, default: "" },
    services: { type: [String], default: [] },
    overview: { type: [String], default: [] },
    challenge: { type: String, default: "" },
    approach: { type: [ApproachStep], default: [] },
    outcomes: { type: [Outcome], default: [] },
    results: { type: String, default: "" },

    status: { type: String, enum: ["draft", "published"], default: "published" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);