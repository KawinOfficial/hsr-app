import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function updateDepartment(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const {
      id,
      name,
      description,
      headId,
      teamMembers,
      budget,
      responsibilities,
      status,
      location,
    } = body;

    const updatedAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("Department")
      .update({
        name,
        description,
        headId,
        teamMembers,
        budget,
        responsibilities,
        status,
        location,
        updatedAt,
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
