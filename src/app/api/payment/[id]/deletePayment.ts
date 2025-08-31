import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { deleteHistory } from "../../paymentHistory/deleteHistory";
import { deleteNotification } from "../../notifications/deleteNotification";

export async function deletePayment(id: string) {
  try {
    await checkUserAuth();
    await deleteNotification({ paymentId: id });
    await deleteHistory({ id, type: "payment" });

    const { data, error } = await supabase
      .from("Payment")
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
