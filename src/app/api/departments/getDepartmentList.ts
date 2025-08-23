import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

function getMemberCount(data: { departmentId: string }[], id: string) {
  return data.filter((item) => item.departmentId === id).length || 0;
}

export async function getDepartmentList() {
  try {
    await checkUserAuth();

    const { data: departments, error: deptError } = await supabase
      .from("Department")
      .select("*")
      .order("createdAt", { ascending: false });
    if (deptError) throw new Error(deptError.message);

    const { data: memberCounts, error: countError } = await supabase
      .from("EmployeeInfo")
      .select("departmentId");
    if (countError) throw new Error(countError.message);

    const dataWithCounts = departments?.map((dept) => ({
      ...dept,
      teamMembers: getMemberCount(memberCounts, dept.id),
    }));

    return NextResponse.json({
      status: "success",
      data: dataWithCounts,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
