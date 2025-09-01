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

    const { data: milestonesData, error: milestonesError } = await supabase
      .from("Milestone")
      .select("*")
      .in("projectId", data?.map((item) => item.id) ?? []);
    if (milestonesError) throw new Error(milestonesError.message);

    const team = 30;

    const formattedData = data?.map((item) => {
      const filteredMilestones = milestonesData?.filter(
        (milestone) => milestone.projectId === item.id
      );

      const budget = Number(item.budget);
      const totalMilestones = filteredMilestones?.length;
      const completedMilestones = filteredMilestones?.filter(
        (milestone) => milestone.status === "Completed"
      )?.length;
      const milestones = {
        total: totalMilestones,
        completed: completedMilestones,
      };
      const spent = filteredMilestones?.reduce(
        (acc, milestone) => acc + Number(milestone.actualCost),
        0
      );
      const variance = budget
        ? Math.round(((budget - spent) / budget) * 100)
        : 0;
      const progress = totalMilestones ? Math.round((spent / budget) * 100) : 0;

      return {
        ...item,
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
