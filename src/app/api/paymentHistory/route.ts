import { NextRequest } from "next/server";
import { getHistoryList } from "./getHistoryList";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const paymentId = searchParams.get("paymentId") || "";
  const assetId = searchParams.get("assetId") || "";
  const liabilityId = searchParams.get("liabilityId") || "";

  return getHistoryList({ page, limit, paymentId, assetId, liabilityId });
}
