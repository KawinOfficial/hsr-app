import { getProjectById } from "./getProjectById";
import { updateProjectById } from "./updateProjectById";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return getProjectById(id);
}

export async function PUT(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updateProjectById(id, req);
}
