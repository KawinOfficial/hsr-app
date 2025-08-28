import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function deleteLiability(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Liability")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    const { error: paymentSchedulesError } = await supabase
      .from("PaymentSchedule")
      .delete()
      .eq("liabilityId", id);
    if (paymentSchedulesError) throw new Error(paymentSchedulesError.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
