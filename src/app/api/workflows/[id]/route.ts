import { NextRequest } from "next/server";
import { updateWorkflow } from "./updateWorkflow";

export async function PUT(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updateWorkflow(id, request);
}
