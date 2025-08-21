import { createMilestone } from "./createMilestone";
import { getMilestoneList } from "./getMilestoneList";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "";

  return getMilestoneList(Number(page), Number(limit), keyword, status);
}

export async function POST(request: NextRequest) {
  return createMilestone(request);
}
