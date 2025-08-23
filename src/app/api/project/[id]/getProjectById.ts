import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";

export async function getProjectById(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Project")
      .select("*")
      .eq("id", id)
      .single();

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

    return NextResponse.json({
      data: {
        ...data,
        budget,
        spent,
        progress,
        variance,
        milestones,
        team,
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
