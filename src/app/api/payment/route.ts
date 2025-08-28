import { createPayment } from "./createPayment";
import { getPayment } from "./getPayment";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const keyword = searchParams.get("keyword") || "";
  const projectId = searchParams.get("projectId") || "";

  return getPayment({ page, limit, keyword, projectId });
}

export async function POST(request: NextRequest) {
  return createPayment(request);
}
