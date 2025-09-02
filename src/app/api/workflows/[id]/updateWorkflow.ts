import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function updateWorkflow(id: string, request: NextRequest) {
  try {
    await checkUserAuth();

    const { name, description, steps } = await request.json();
    const updatedAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("ApprovalWorkflow")
      .update({ name, description, steps, updatedAt })
      .eq("id", id);
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
