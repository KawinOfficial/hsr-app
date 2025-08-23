import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function deleteMilestoneById(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Milestone")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
