import { createProject } from "./createProject";
import { getProjects } from "./getProjects";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "";

  return getProjects({
    page: Number(page),
    limit: Number(limit),
    keyword,
    status,
  });
}

export async function POST(request: NextRequest) {
  return createProject(request);
}
