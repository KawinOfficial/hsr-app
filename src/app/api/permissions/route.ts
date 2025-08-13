import { createPermission } from "./createPermission";
import { getPermissionList } from "./getPermssionList";

export async function POST(req: Request) {
  return createPermission(req);
}

export async function GET() {
  return getPermissionList();
}
