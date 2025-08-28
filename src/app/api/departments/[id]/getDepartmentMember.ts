import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getDepartmentMember(
  id: string,
  page: string = "1",
  limit: string = "10",
  keyword: string = "",
  roleId: string = ""
) {
  try {
    await checkUserAuth();

    const query = supabase
      .from("EmployeeInfo")
      .select("*,User(*)", {
        count: "exact",
      })
      .eq("departmentId", id);

    if (roleId) {
      query.eq("roleId", roleId);
    }

    query.range(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit) - 1
    );

    const {
      data: employeeInfoData,
      error: employeeInfoError,
      count,
    } = await query;
    if (employeeInfoError) throw new Error(employeeInfoError.message);
    const formattedData = employeeInfoData.map(({ User, ...user }) => ({
      ...User,
      passwordHash: undefined,
      status: "active",
      employeeInfo: { ...user },
    }));

    return NextResponse.json({
      data: formattedData,
      pagination: {
        totalItems: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / Number(limit)),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
