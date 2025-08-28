import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function createWorkflow(request: NextRequest) {
  try {
    await checkUserAuth();
    const { name, description, steps, workflowId } = await request.json();
    const createdAt = new Date().toISOString();

    const { data, error } = await supabase.from("ApprovalWorkflow").insert({
      name,
      description,
      steps,
      workflowId,
      createdAt,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
