import { createCategory } from "./createCategory";
import { getCategories } from "./getCategories";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const keyword = searchParams.get("keyword");

  return await getCategories({
    page: Number(page),
    limit: Number(limit),
    keyword: keyword ?? "",
  });
}

export async function POST(request: NextRequest) {
  return await createCategory(request);
}
