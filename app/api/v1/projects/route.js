import { createProject, listProjects } from "@/lib/controller/project";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { created, ok } from "@/lib/utils/response";

/**
 * GET  /api/v1/projects?status=all&category=all&q=
 *   Admin. Defaults to everything; `status=published` gives only live projects.
 * POST /api/v1/projects   Admin.
 */
export const GET = handler(async (request) => {
  await requireAdmin();

  const params = new URL(request.url).searchParams;

  const projects = await listProjects({
    status: params.get("status") ?? "all",
    category: params.get("category") ?? "all",
    search: params.get("q") ?? "",
  });

  return ok(projects);
});

export const POST = handler(async (request) => {
  await requireAdmin();

  return created(await createProject(await request.json()));
});