import { getMemberById } from "./getMemberById";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return getMemberById(id);
}
