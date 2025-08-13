import { createPermission } from "./createPermission";

export async function POST(req: Request) {
  return createPermission(req);
}
