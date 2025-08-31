import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getPermissionList() {
  try {
    await checkUserAuth();

    const { data: roles, error } = await supabase
      .from("Role")
      .select("*")
      .order("updatedAt", { ascending: false });
    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data: roles,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
