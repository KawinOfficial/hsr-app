import { getTeamMemberList } from "./getTeamMemberList";

export async function GET() {
  return getTeamMemberList();
}
