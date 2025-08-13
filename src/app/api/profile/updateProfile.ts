import { supabase } from "@/lib/supabase";
import { checkUserAuth } from "@/lib/promise";
import { NextResponse } from "next/server";

export async function updateProfile(req: Request) {
  try {
    const userId = await checkUserAuth();
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nationality,
      otherNationality,
      employeeInfo = {},
    } = body;

    const { error: userUpdateError } = await supabase
      .from("User")
      .update({
        firstName,
        lastName,
        email,
        phoneNumber,
        nationality,
        otherNationality,
      })
      .eq("id", userId);
    if (userUpdateError) throw new Error(userUpdateError.message);

    const { employeeId, position, department, managerName, workLocation } =
      employeeInfo;
    const { error: empUpdateError } = await supabase
      .from("EmployeeInfo")
      .update({
        employeeId,
        position,
        department,
        managerName,
        workLocation,
      })
      .eq("userId", userId);

    if (empUpdateError) throw new Error(empUpdateError.message);

    return NextResponse.json({
      ...body,
      status: "active",
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
