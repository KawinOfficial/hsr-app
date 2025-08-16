import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function createDepartment(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const department = body;

    const { data, error } = await supabase
      .from("Department")
      .insert(department);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
