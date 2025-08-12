import bcrypt from "bcryptjs";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auths/schemas/Register.schema";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

async function findUserByEmail(email: string) {
  const { data } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();
  return data;
}

async function createUser(validatedData: RegisterFormData) {
  const passwordHash = bcrypt.hashSync(validatedData.password, 10);

  return await supabase
    .from("User")
    .insert({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phoneNumber: validatedData.phone,
      nationality: validatedData.nationality,
      otherNationality: validatedData.otherNationality,
      passwordHash,
    })
    .select()
    .single();
}

async function createEmployeeInfo(
  userId: number,
  validatedData: RegisterFormData
) {
  return await supabase.from("EmployeeInfo").insert({
    userId,
    employeeId: validatedData.employeeId,
    department: validatedData.department,
    position: validatedData.position,
    managerName: validatedData.reportingTo,
    workLocation: validatedData.workLocation,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validatedData.error },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // Check if user already exists
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const { data: user, error: userError } = await createUser(data);
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    const { error: employeeError } = await createEmployeeInfo(user.id, data);
    if (employeeError) {
      // If employee info creation fails, delete the user
      await supabase.from("User").delete().eq("id", user.id);
      return NextResponse.json(
        { error: employeeError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
