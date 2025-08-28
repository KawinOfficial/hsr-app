import { createHistory } from "../paymentHistory/createHistory";
import { checkUserAuth, getCurrentUser } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { PaymentSchedule } from "@/features/financial/schemas/PaymentSchedule.schema";
import { generatePaymentId } from "@/lib/format";

export async function createLiability(request: NextRequest) {
  try {
    await checkUserAuth();

    const body = await request.json();
    const { paymentSchedules, ...liability } = body;
    const user = await getCurrentUser();
    const now = new Date();
    const createdAt = now.toISOString();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    const { data: lastLiabilities, error: fetchError } = await supabase
      .from("Liability")
      .select("liabilityId")
      .ilike("liabilityId", `LIA-${month}${year}-%`)
      .order("createdAt", { ascending: false })
      .limit(1);
    if (fetchError) throw new Error(fetchError.message);
    const lastLiabilityId =
      lastLiabilities && lastLiabilities.length > 0
        ? lastLiabilities[0].liabilityId
        : null;
    const liabilityId = generatePaymentId("LIA", lastLiabilityId, month, year);

    const { data, error } = await supabase
      .from("Liability")
      .insert({
        ...liability,
        createdBy: user?.id,
        createdAt,
        liabilityId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (paymentSchedules) {
      const { error: paymentSchedulesError } = await supabase
        .from("PaymentSchedule")
        .insert(
          paymentSchedules.map((paymentSchedule: PaymentSchedule) => ({
            ...paymentSchedule,
            createdAt,
            liabilityId: data?.id,
          }))
        );
      if (paymentSchedulesError) throw new Error(paymentSchedulesError.message);
    }

    const history = {
      liabilityId: data?.id,
      action: "Create",
      description: "Liability created",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
