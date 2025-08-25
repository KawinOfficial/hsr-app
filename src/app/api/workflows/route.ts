import { createWorkflow } from "./createWorkflow";
import { getWorkflowList } from "./getWorkflowList";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const keyword = searchParams.get("keyword");

  return await getWorkflowList({
    page: Number(page),
    limit: Number(limit),
    keyword: keyword ?? "",
  });
}

export async function POST(request: NextRequest) {
  return await createWorkflow(request);
}
