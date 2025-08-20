import { getDepartmentMember } from "./getDepartmentMember";

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const keyword = searchParams.get("keyword") || "";
  const roleId = searchParams.get("roleId") || "";

  return getDepartmentMember(id, page, limit, keyword, roleId);
}
