import mongoose from "mongoose";

/** Enquiry sent from the public contact form. Read and managed in the admin. */
const QuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },

    status: { type: String, enum: ["new", "progress", "resolved"], default: "new" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    /** Internal note, e.g. what you replied. Not shown to the sender. */
    reply: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Query || mongoose.model("Query", QuerySchema);