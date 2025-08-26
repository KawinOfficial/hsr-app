import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function updateDocumentType(id: string, request: NextRequest) {
  try {
    await checkUserAuth();
    const { name, description, categoryId, workflowId, isActive, documentId } =
      await request.json();

    const { data, error } = await supabase
      .from("DocumentTypes")
      .update({
        name,
        description,
        categoryId,
        workflowId,
        isActive,
        documentId,
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
