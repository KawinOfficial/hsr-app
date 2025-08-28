import { getLiabilityDetail } from "./getLiabilityDetail";
import { deleteLiability } from "./deleteLiability";
import { updateLiability } from "./updateLiability";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return getLiabilityDetail(id);
}

export async function DELETE(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return deleteLiability(id);
}

export async function PUT(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updateLiability(id, await req.json());
}
