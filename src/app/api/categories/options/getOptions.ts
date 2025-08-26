import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getCategoriesOptions() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .order("updatedAt", { ascending: false })
      .eq("isDeleted", false);
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
