import { getTeamMemberList } from "./getTeamMemberList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const itemsPerPage = searchParams.get("itemsPerPage") || "10";

  return getTeamMemberList(page, itemsPerPage);
}
