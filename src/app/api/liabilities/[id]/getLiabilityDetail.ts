import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getLiabilityDetail(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Liability")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);

    const { data: paymentSchedules, error: paymentSchedulesError } =
      await supabase
        .from("PaymentSchedule")
        .select("*")
        .eq("liabilityId", id)
        .order("createdAt", { ascending: false });
    if (paymentSchedulesError) throw new Error(paymentSchedulesError.message);

    const formattedData = {
      ...data,
      paymentSchedules,
    };

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
