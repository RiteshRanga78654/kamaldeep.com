import { getStats, getQueries } from "@/lib/store";
import { requestHasSession } from "@/lib/auth";

export async function GET(request) {
  if (!requestHasSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const stats = getStats();
  const recent = getQueries().slice(0, 5);
  return Response.json({ stats, recent });
}