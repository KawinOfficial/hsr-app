import { getAssetsDetail } from "./getAssetsDetail";
import { deleteAssets } from "./deleteAssets";
import { updateAssets } from "./updateAssets";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return getAssetsDetail(id);
}

export async function DELETE(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return deleteAssets(id);
}

export async function PUT(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updateAssets(id, await req.json());
}
