import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function createCategory(request: NextRequest) {
  try {
    await checkUserAuth();
    const body = await request.json();
    const { data, error } = await supabase.from("Category").insert({
      ...body,
      createdAt: new Date().toISOString(),
    });
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
