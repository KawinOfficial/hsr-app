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
      .select("*")
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

    const userIds = employeeInfoData.map((user) => user.userId);
    if (!userIds.length) {
      return NextResponse.json({
        data: [],
        pagination: {
          totalItems: 0,
          totalPages: 0,
          currentPage: 0,
          itemsPerPage: 0,
        },
      });
    }

    let baseQuery = supabase
      .from("User")
      .select("*")
      .in("id", userIds)
      .order("createdAt", { ascending: false });
    if (keyword) {
      baseQuery = baseQuery.or(
        `firstName.ilike.%${keyword}%,lastName.ilike.%${keyword}%,email.ilike.%${keyword}%`
      );
    }
    baseQuery.order("createdAt", { ascending: false });
    const { data: usersData, error: usersError } = await baseQuery;
    if (usersError) throw new Error(usersError.message);

    const formattedData = usersData.map((user) => ({
      ...user,
      passwordHash: undefined,
      status: "active",
      employeeInfo: employeeInfoData.find((info) => info.userId === user.id),
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
