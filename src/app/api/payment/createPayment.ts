import { createHistory } from "../paymentHistory/createHistory";
import { checkUserAuth, getCurrentUser } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function createPayment(request: NextRequest) {
  try {
    await checkUserAuth();

    const body = await request.json();
    const payment = body;
    const user = await getCurrentUser();
    const status = "Pending Approval";
    const now = new Date();
    const createdAt = now.toISOString();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    const { data: lastPayments, error: fetchError } = await supabase
      .from("Payment")
      .select("paymentId")
      .ilike("paymentId", `PAY-${month}${year}-%`)
      .order("createdAt", { ascending: false })
      .limit(1);
    if (fetchError) throw new Error(fetchError.message);
    let runningNumber = 1;
    if (lastPayments && lastPayments.length > 0) {
      const lastPaymentId = lastPayments[0].paymentId;
      const match = lastPaymentId.match(/PAY-\d{4}-(\d+)/);
      if (match && match[1]) {
        runningNumber = parseInt(match[1], 10) + 1;
      }
    }
    const paymentId = `PAY-${month}${year}-${runningNumber
      .toString()
      .padStart(4, "0")}`;

    const { data, error } = await supabase
      .from("Payment")
      .insert({
        ...payment,
        createdBy: user?.id,
        createdAt,
        status,
        paymentId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    const history = {
      paymentId: data?.id,
      action: "Create",
      description: "Payment created",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
