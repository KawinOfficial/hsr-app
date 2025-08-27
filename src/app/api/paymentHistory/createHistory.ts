import { checkUserAuth, getCurrentUser } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function createHistory(body: Record<string, string>) {
  try {
    await checkUserAuth();

    const user = await getCurrentUser();
    const createdAt = new Date().toISOString();

    const history = {
      ...body,
      createdBy: [user?.firstName, user?.lastName].join(" "),
      email: user?.email,
      createdAt,
    };

    const { data, error } = await supabase
      .from("PaymentHistory")
      .insert(history)
      .select()
      .single();
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
