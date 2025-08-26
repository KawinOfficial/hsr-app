import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getWorkflowOptions() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("ApprovalWorkflow")
      .select("*")
      .order("updatedAt", { ascending: false });
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
