import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";
import { paginateArray } from "@/lib/pagination";

export async function getTeamMember(
  page: string = "1",
  itemsPerPage: string = "10",
  departmentId?: string
) {
  try {
    await checkUserAuth();

    let employeeInfoQuery = supabase.from("EmployeeInfo").select("*");
    if (departmentId !== undefined) {
      employeeInfoQuery = employeeInfoQuery.neq("departmentId", departmentId);
    }
    const { data: employeeInfoData, error: userError } =
      await employeeInfoQuery;
    if (userError) throw new Error(userError.message);

    const {
      paginatedData: paginatedEmployeeInfo,
      totalItems,
      totalPages,
    } = paginateArray(employeeInfoData, page, itemsPerPage);

    const userIds = paginatedEmployeeInfo.map((user) => user.userId);

    let users = [];
    if (userIds.length > 0) {
      const { data: usersData, error: employeeInfoError } = await supabase
        .from("User")
        .select("*")
        .in("id", userIds)
        .order("createdAt", { ascending: false });
      if (employeeInfoError) throw new Error(employeeInfoError.message);
      users = usersData;
    }

    const formattedData = users.map((user) => ({
      ...user,
      passwordHash: undefined,
      status: "active",
      employeeInfo: paginatedEmployeeInfo.find(
        (info) => info.userId === user.id
      ),
    }));
    return NextResponse.json({
      data: formattedData,
      pagination: {
        totalItems,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(itemsPerPage),
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
