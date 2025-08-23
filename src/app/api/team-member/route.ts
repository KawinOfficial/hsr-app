import { getTeamMemberList } from "./getTeamMemberList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const keyword = searchParams.get("keyword") || "";

  return getTeamMemberList(page, limit, keyword);
}
