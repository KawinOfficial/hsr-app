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

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
