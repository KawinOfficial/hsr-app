import { createAssets } from "./createAssets";
import { getAssets } from "./getAssets";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const keyword = searchParams.get("keyword") || "";
  const projectId = searchParams.get("projectId") || "";

  return getAssets({ page, limit, keyword, projectId });
}

export async function POST(request: NextRequest) {
  return createAssets(request);
}
