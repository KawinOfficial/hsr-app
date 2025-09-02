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

    const { data: milestonesData, error: milestonesError } = await supabase
      .from("Milestone")
      .select("*")
      .eq("projectId", id);
    if (milestonesError) throw new Error(milestonesError.message);

    const { data: teamData, error: teamError } = await supabase
      .from("EmployeeInfo")
      .select("id,departmentId", { count: "exact" })
      .eq("departmentId", data?.departmentId);
    if (teamError) throw new Error(teamError.message);

    const filteredMilestones = milestonesData;
    const budget = Number(data?.budget);
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
    const variance = budget ? Math.round(((budget - spent) / budget) * 100) : 0;
    const progress = totalMilestones ? Math.round((spent / budget) * 100) : 0;
    const team = teamData.filter(
      (team) => team.departmentId === data?.departmentId
    )?.length;

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
