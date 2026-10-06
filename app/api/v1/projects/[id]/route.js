import Project from "@/lib/db/models/Project";
import { deleteProject, updateProject } from "@/lib/controller/project";
import { requireAdmin } from "@/lib/middleware/auth";
import { handler } from "@/lib/middleware/handler";
import { notFound } from "@/lib/utils/errors";
import { ok } from "@/lib/utils/response";

/** GET / PUT / DELETE /api/v1/projects/:id  (admin) */
export const GET = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  const project = await Project.findById(id).lean();
  if (!project) throw notFound("Project not found");

  return ok(project);
});

export const PUT = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await updateProject(id, await request.json()));
});

export const DELETE = handler(async (request, { params }) => {
  await requireAdmin();

  const { id } = await params;

  return ok(await deleteProject(id));
});