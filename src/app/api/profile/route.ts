import { auth } from "@/lib/auth";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const userId = await checkUserAuth();
    const { data: user, error: userError } = await getUserById(userId);
    if (userError) {
      throw new Error(userError.message);
    }

    const { data: employeeInfo, error: employeeError } =
      await getEmployeeInfoByUserId(userId);
    if (employeeError && employeeError.code !== "PGRST116") {
      throw new Error(employeeError.message);
    }

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

export async function POST(req: Request) {
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
    if (userUpdateError) {
      throw new Error(userUpdateError.message);
    }

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

    if (empUpdateError) {
      throw new Error(empUpdateError.message);
    }

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
