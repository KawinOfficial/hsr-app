import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function createProject(request: NextRequest) {
  try {
    await checkUserAuth();

    const body = await request.json();
    const project = body;

    const { data, error } = await supabase.from("Project").insert(project);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
