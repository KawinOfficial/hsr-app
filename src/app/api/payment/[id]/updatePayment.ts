import { Payment } from "@/features/financial/schemas/Payment.schema";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { createHistory } from "../../paymentHistory/createHistory";

export async function updatePayment(id: string, body: Payment) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Payment")
      .update(body)
      .eq("id", id);
    if (error) throw new Error(error.message);
    const history = {
      paymentId: id,
      action: "Update",
      description: "Payment updated",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
