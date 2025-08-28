import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function updateCategory(id: string, request: NextRequest) {
  try {
    if (!id) throw new Error("Category ID is required");

    await checkUserAuth();
    const { name, description, budgetLimit, isActive } = await request.json();

    const { data, error } = await supabase
      .from("Category")
      .update({ name, description, budgetLimit, isActive })
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
