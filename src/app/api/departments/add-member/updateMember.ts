import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function updateMember(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const { userIds, departmentId } = body;

    const { data, error } = await supabase
      .from("EmployeeInfo")
      .update({ departmentId })
      .in("userId", userIds);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
