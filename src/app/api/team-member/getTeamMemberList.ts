import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getTeamMemberList(
  page: string,
  limit: string,
  keyword: string
) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("User")
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false });
    if (keyword) {
      query = query.or(
        `firstName.ilike.%${keyword}%,lastName.ilike.%${keyword}%,email.ilike.%${keyword}%`
      );
    }
    query = query.range(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit) - 1
    );

    const { data: usersData, error: userError, count } = await query;
    if (userError) throw new Error(userError.message);

    const userIds = usersData.map((user) => user.id);

    const { data: employeeInfoData, error: employeeInfoError } = await supabase
      .from("EmployeeInfo")
      .select("*")
      .in("userId", userIds);
    if (employeeInfoError) throw new Error(employeeInfoError.message);

    const formattedData = usersData.map((user) => ({
      ...user,
      passwordHash: undefined,
      status: "active",
      employeeInfo: employeeInfoData.find((info) => info.userId === user.id),
    }));

    return NextResponse.json({
      status: "success",
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
