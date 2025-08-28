import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getPayment({
  page,
  limit,
  keyword,
  projectId,
}: {
  page: number;
  limit: number;
  keyword?: string;
  projectId?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("Payment")
      .select("*", { count: "exact" })
      .order("updatedAt", { ascending: false });
    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }
    if (projectId) {
      query = query.eq("projectId", projectId);
    }
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data,
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
