import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function updatePermission(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const { id, name, description, isActive, permissions } = body;
    if (!id) throw new Error("Missing role id");

    const { data, error } = await supabase
      .from("Role")
      .update({
        name,
        description,
        isActive,
        permissions,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
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
