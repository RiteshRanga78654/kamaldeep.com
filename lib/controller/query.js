import connectDB from "@/lib/db/connect";

import Query from "@/lib/db/models/Query";
import { notFound } from "@/lib/utils/errors";
import { contains } from "@/lib/utils/search";
import { oneOf, require_, requireEmail, text } from "@/lib/utils/validate";

/**
 * Enquiries from the public contact form.
 *
 * Reading is admin-only; creating one is public, so the create path validates
 * harder than the update path and never echoes back more than it stored.
 */

export async function createQuery(body) {
  await connectDB();

  const saved = await Query.create({
    name: require_(body.name, "Name"),
    email: requireEmail(body.email),
    phone: text(body.phone, 40),
    subject: text(body.subject, 200),
    message: require_(body.message, "Message"),
    priority: oneOf(body.priority, ["low", "medium", "high"], "medium"),
  });

  return { id: saved.id, createdAt: saved.createdAt };
}

export async function listQueries({ status = "all", priority = "all", search = "" } = {}) {
  await connectDB();
  const filter = {};

  if (status !== "all") filter.status = status;
  if (priority !== "all") filter.priority = priority;

  const term = contains(search, ["name", "email", "subject", "message"]);
  if (term) Object.assign(filter, term);

  return Query.find(filter).sort({ createdAt: -1 }).lean();
}

export async function getQuery(id) {
  await connectDB();
  const query = await Query.findById(id).lean();
  if (!query) throw notFound("Query not found");

  return query;
}

/**
 * Partial update — the admin panel only ever sends the fields that changed.
 * Opening a query from the list marks it "in progress" automatically.
 */
export async function updateQuery(id, body) {
  await connectDB();
  const query = await Query.findById(id);
  if (!query) throw notFound("Query not found");

  if (body.status !== undefined) {
    query.status = oneOf(body.status, ["new", "progress", "resolved"], query.status);
  }

  if (body.priority !== undefined) {
    query.priority = oneOf(body.priority, ["low", "medium", "high"], query.priority);
  }

  if (body.reply !== undefined) {
    query.reply = text(body.reply, 4000);
  }

  await query.save();

  return query.toObject();
}

export async function deleteQuery(id) {
  await connectDB();
  const query = await Query.findByIdAndDelete(id);
  if (!query) throw notFound("Query not found");

  return { id: query.id };
}

export async function deleteQueries(ids) {
  await connectDB();
  const result = await Query.deleteMany({ _id: { $in: ids } });

  return { deleted: result.deletedCount ?? 0 };
}