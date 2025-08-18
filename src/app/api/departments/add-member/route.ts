import { getTeamMember } from "./getTeamMember";
import { updateMember } from "./updateMember";

export async function PUT(req: Request) {
  return updateMember(req);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const itemsPerPage = searchParams.get("itemsPerPage") || "10";
  const departmentId = searchParams.get("departmentId") || "";

  return getTeamMember(page, itemsPerPage, departmentId);
}
