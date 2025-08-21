import { updateMilestone } from "./updateMilestone";

export async function PUT(request: Request) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updateMilestone(id, request);
}
