import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getMemberById(id: string) {
  try {
    await checkUserAuth();
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);

    const { data: employeeInfoData, error: employeeInfoError } = await supabase
      .from("EmployeeInfo")
      .select("*")
      .eq("userId", id)
      .single();
    if (employeeInfoError) throw new Error(employeeInfoError.message);

    const roleId = employeeInfoData?.roleId;

    const { data: permissionData, error: permissionError } = await supabase
      .from("Role")
      .select("*")
      .eq("id", roleId)
      .single();
    if (permissionError) throw new Error(permissionError.message);

    const formattedData = {
      ...data,
      status: "active",
      passwordHash: undefined,
      employeeInfo: employeeInfoData,
      permissions: permissionData?.permissions,
    };

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
