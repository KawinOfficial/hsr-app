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

async function createNewUser(validatedData: RegisterFormData) {
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
    departmentId: validatedData.departmentId,
    roleId: validatedData.roleId,
    managerName: validatedData.reportingTo,
    workLocation: validatedData.workLocation,
  });
}

export async function createUser(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.safeParse(body);
    if (!validatedData.success) {
      throw new Error("Invalid request data");
    }

    const data = validatedData.data;

    // Check if user already exists
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const { data: user, error: userError } = await createNewUser(data);
    if (userError) {
      throw new Error(userError.message);
    }

    const { error: employeeError } = await createEmployeeInfo(user.id, data);
    if (employeeError) {
      // If employee info creation fails, delete the user
      await supabase.from("User").delete().eq("id", user.id);
      throw new Error(employeeError.message);
    }

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      throw new Error("Invalid request data");
    }

    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
