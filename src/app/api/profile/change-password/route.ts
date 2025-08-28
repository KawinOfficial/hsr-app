import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const userId = await checkUserAuth();
    const { data: user, error: userError } = await supabase
      .from("User")
      .select("*")
      .eq("id", userId)
      .single();
    if (userError) {
      return NextResponse.json(
        { error: userError.message || "Failed to fetch user" },
        { status: 500 }
      );
    }
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = bcrypt.compareSync(
      currentPassword as string,
      user.passwordHash as string
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid current password" },
        { status: 400 }
      );
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword as string, 10);
    const { error: updateError } = await supabase
      .from("User")
      .update({ passwordHash: hashedNewPassword })
      .eq("id", userId);
    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to update password" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
