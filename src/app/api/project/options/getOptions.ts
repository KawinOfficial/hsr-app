import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getOptions() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .order("updatedAt", { ascending: false });
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
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
