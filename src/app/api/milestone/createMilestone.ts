import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function createMilestone(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const {
      milestoneId,
      name,
      description,
      status,
      targetDate,
      startDate,
      priority,
      phase,
      budget,
      actualCost,
      deliverables,
      projectId,
    } = body;

    const createdAt = new Date().toISOString();
    const { data, error } = await supabase.from("Milestone").insert({
      milestoneId,
      name,
      description,
      status,
      targetDate,
      startDate,
      priority,
      phase,
      budget,
      actualCost,
      deliverables,
      projectId,
      createdAt,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
