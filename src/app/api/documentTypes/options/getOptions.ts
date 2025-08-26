import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getDocumentTypeOptions() {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("DocumentTypes")
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
