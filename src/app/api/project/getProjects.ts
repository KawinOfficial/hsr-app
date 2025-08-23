import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getProjects({
  page,
  limit,
  keyword,
  status,
}: {
  page: number;
  limit: number;
  keyword?: string;
  status?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("Project")
      .select("*", { count: "exact" })
      .order("updatedAt", { ascending: false });
    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }
    if (status) {
      query = query.eq("status", status);
    }
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    // TODO: Remove this after backend is implemented
    const budget = 1000000;
    const spent = 500000;
    const progress = 50;
    const variance = budget ? Math.round(((budget - spent) / budget) * 100) : 0;
    const milestones = {
      total: 10,
      completed: 5,
    };
    const team = 30;

    const formattedData = data?.map((item) => {
      return {
        ...item,
        budget,
        spent,
        progress,
        variance,
        milestones,
        team,
      };
    });

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
