import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";

export async function updateProjectById(id: string, req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const {
      name,
      description,
      status,
      budget,
      startDate,
      targetDate,
      location,
      departmentId,
      manager,
      riskLevel,
    } = body;

    const { data, error } = await supabase
      .from("Project")
      .update({
        name,
        description,
        status,
        budget,
        startDate,
        targetDate,
        location,
        departmentId,
        manager,
        riskLevel,
      })
      .eq("id", id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
