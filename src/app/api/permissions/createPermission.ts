import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function createPermission(req: Request) {
  try {
    await checkUserAuth();

    const body = await req.json();
    const { name, description } = body;
    if (!name) throw new Error("Permission name is required");

    const { data, error } = await supabase
      .from("Role")
      .insert([
        {
          name,
          description,
          permissions: body.permissions,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ...data,
      status: "created",
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
