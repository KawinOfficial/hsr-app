import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getDepartmentList() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Department")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
