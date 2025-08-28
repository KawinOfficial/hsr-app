import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getDocumentTypes({
  page,
  limit,
  keyword,
  categoryId,
}: {
  page: number;
  limit: number;
  keyword?: string;
  categoryId?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("DocumentTypes")
      .select("*", { count: "exact" })
      .range((page - 1) * limit, page * limit - 1)
      .order("updatedAt", { ascending: false })
      .eq("isDeleted", false);

    if (keyword) {
      query = query.filter("name", "ilike", `%${keyword}%`);
    }

    if (categoryId) {
      query = query.eq("categoryId", categoryId);
    }
    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data: data,
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
