import { getQueries, addQuery, makeId } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function GET(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ queries: getQueries() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return Response.json({ error: "name, email and message are required" }, { status: 400 });
    }
    const query = {
      id: makeId(),
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      subject: body.subject ? String(body.subject).trim() : "General",
      message: String(body.message).trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    addQuery(query);
    return Response.json({ query }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}