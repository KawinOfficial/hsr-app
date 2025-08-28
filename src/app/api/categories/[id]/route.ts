import { deleteCategory } from "./deleteCategory";
import { updateCategory } from "./updateCategory";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return await updateCategory(id ?? "", request);
}

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return await deleteCategory(id ?? "");
}
