import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function createDocumentType(request: NextRequest) {
  try {
    await checkUserAuth();
    const { name, description, categoryId, workflowId, isActive, documentId } =
      await request.json();
    const createdAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("DocumentTypes")
      .insert({
        name,
        description,
        categoryId,
        workflowId,
        isActive,
        documentId,
        createdAt,
      })
      .select()
      .single();
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
