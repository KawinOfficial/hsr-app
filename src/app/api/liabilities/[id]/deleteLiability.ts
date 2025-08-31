import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { deleteHistory } from "../../paymentHistory/deleteHistory";
import { deleteNotification } from "../../notifications/deleteNotification";

export async function deleteLiability(id: string) {
  try {
    await checkUserAuth();
    await deleteNotification({ liabilityId: id });
    await deleteHistory({ id, type: "liability" });

    const { error: paymentSchedulesError } = await supabase
      .from("PaymentSchedule")
      .delete()
      .eq("liabilityId", id);
    if (paymentSchedulesError) throw new Error(paymentSchedulesError.message);

    const { data, error } = await supabase
      .from("Liability")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
