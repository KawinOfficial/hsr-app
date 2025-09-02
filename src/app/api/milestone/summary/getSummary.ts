import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getSummary() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Milestone")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) throw new Error(error.message);

    const completed = data?.filter(
      (milestone) => milestone.status === "Completed"
    ).length;
    const totalBudget = data?.reduce(
      (sum, milestone) => sum + milestone.budget,
      0
    );
    const totalSpent = data?.reduce(
      (sum, milestone) => sum + milestone.actualCost,
      0
    );
    const critical = data?.filter((milestone) =>
      ["Critical", "At Risk"].includes(milestone.status)
    ).length;
    const delayed = data?.filter(
      (milestone) => milestone.status === "Delayed"
    ).length;
    const total = data?.length;
    const overallProgress = (completed / total) * 100;

    return NextResponse.json({
      status: "success",
      data: {
        completed,
        totalBudget,
        totalSpent,
        critical,
        delayed,
        total,
        overallProgress,
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
