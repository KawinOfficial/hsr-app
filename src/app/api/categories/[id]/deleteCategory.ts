import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function deleteCategory(id: string) {
  try {
    await checkUserAuth();
    const { data, error } = await supabase
      .from("Category")
      .update({
        isActive: false,
        isDeleted: true,
      })
      .eq("id", id);
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
