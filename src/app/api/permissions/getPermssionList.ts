import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getPermissionList() {
  try {
    await checkUserAuth();

    const { data: roles, error } = await supabase
      .from("Role")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const rolesWithUserCount = await Promise.all(
      (roles || []).map(async (role) => {
        const { count, error: userCountError } = await supabase
          .from("UserRole")
          .select("roleId", { count: "exact", head: true })
          .eq("roleId", role.id);

        if (userCountError) {
          throw new Error(userCountError.message);
        }

        return {
          ...role,
          userCount: count ?? 0,
        };
      })
    );

    return NextResponse.json({
      status: "success",
      data: rolesWithUserCount,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
