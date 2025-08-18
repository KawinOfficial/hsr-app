import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getOptions() {
  try {
    const { data, error } = await supabase.from("Role").select("*");
    if (error) throw new Error(error.message);
    const { data: departments, error: departmentsError } = await supabase
      .from("Department")
      .select("*");
    if (departmentsError) throw new Error(departmentsError.message);
    const { data: users, error: usersError } = await supabase
      .from("User")
      .select("*")
      .order("createdAt", { ascending: false });
    if (usersError) throw new Error(usersError.message);

    const formattedDepartments = departments.map((department) => ({
      value: department.id,
      label: department.name,
    }));
    const formattedRoles = data.map((role) => ({
      value: role.id,
      label: role.name,
    }));
    const formattedUsers = users.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }));

    return NextResponse.json({
      roles: formattedRoles,
      departments: formattedDepartments,
      users: formattedUsers,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
