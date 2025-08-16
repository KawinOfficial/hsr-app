import { getDepartmentMember } from "./getDepartmentMember";

export async function GET(
  request: Request,
  { params }: { params: { id: string; page: string; itemsPerPage: string } }
) {
  const { id, page, itemsPerPage } = await params;
  return getDepartmentMember(id, page, itemsPerPage);
}
