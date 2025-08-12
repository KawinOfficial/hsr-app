import { auth } from "@/lib/auth";
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

export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - No valid session" },
        { status: 401 }
      );
    }

    const { data: user, error: userError } = await getUserById(userId);
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    const { data: employeeInfo, error: employeeError } =
      await getEmployeeInfoByUserId(userId);
    if (employeeError && employeeError.code !== "PGRST116") {
      return NextResponse.json(
        { error: employeeError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...user,
      passwordHash: undefined,
      employeeInfo: employeeInfo || null,
      status: "active",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
