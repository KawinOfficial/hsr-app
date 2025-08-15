import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

async function getEmployeeInfoByUserId(userId: string) {
  const { data, error } = await supabase
    .from("EmployeeInfo")
    .select("*")
    .eq("userId", userId)
    .single();
  return { data, error };
}

export async function getProfile() {
  try {
    const userId = await checkUserAuth();
    const { data: user, error: userError } = await getUserById(userId);
    if (userError) throw new Error(userError.message);

    const { data: employeeInfo, error: employeeError } =
      await getEmployeeInfoByUserId(userId);
    if (employeeError && employeeError.code !== "PGRST116")
      throw new Error(employeeError.message);

    return NextResponse.json({
      ...user,
      passwordHash: undefined,
      employeeInfo: employeeInfo || null,
      status: "active",
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
