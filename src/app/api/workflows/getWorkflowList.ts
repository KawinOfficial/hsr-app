import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getWorkflowList({
  page,
  limit,
  keyword,
}: {
  page: number;
  limit: number;
  keyword?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("ApprovalWorkflow")
      .select("*", { count: "exact" })
      .order("updatedAt", { ascending: false });

    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    const { data: documentTypesData, error: documentTypesError } =
      await supabase
        .from("DocumentTypes")
        .select("id,workflowId", { count: "exact" })
        .in("workflowId", data?.map((item) => item.id) ?? []);
    if (documentTypesError) throw new Error(documentTypesError.message);

    const formattedData = data?.map((item) => ({
      ...item,
      totalDocs:
        documentTypesData?.filter((dt) => dt.workflowId === item.id)?.length ??
        0,
    }));

    return NextResponse.json({
      status: "success",
      data: formattedData,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil((count ?? 0) / limit),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
