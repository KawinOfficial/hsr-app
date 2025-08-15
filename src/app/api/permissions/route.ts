import { createPermission } from "./createPermission";
import { getPermissionList } from "./getPermssionList";
import { updatePermission } from "./updatePermission";

export async function POST(req: Request) {
  return createPermission(req);
}

export async function GET() {
  return getPermissionList();
}

export async function PUT(req: Request) {
  return updatePermission(req);
}
