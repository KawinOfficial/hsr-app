import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { checkUserAuth } from "@/lib/promise";

export async function getTeamMemberList() {
  try {
    await checkUserAuth();
    const { data: usersData, error: userError } = await supabase
      .from("User")
      .select("*")
      .order("createdAt", { ascending: false });
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
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
