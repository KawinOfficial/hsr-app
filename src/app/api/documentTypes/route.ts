import { NextRequest } from "next/server";
import { createDocumentType } from "./createDocumentType";
import { getDocumentTypes } from "./getDocumentTypes";

export async function POST(request: NextRequest) {
  return await createDocumentType(request);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;
  const keyword = searchParams.get("keyword") ?? "";
  const categoryId = searchParams.get("categoryId") ?? "";

  return await getDocumentTypes({
    page: Number(page),
    limit: Number(limit),
    keyword,
    categoryId,
  });
}
