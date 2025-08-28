import { createLiability } from "./createLiability";
import { getLiabilities } from "./getLiabilities";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const keyword = searchParams.get("keyword") || "";
  const projectId = searchParams.get("projectId") || "";

  return getLiabilities({ page, limit, keyword, projectId });
}

export async function POST(request: NextRequest) {
  return createLiability(request);
}
