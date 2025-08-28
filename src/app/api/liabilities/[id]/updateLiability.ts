import { Liability } from "@/features/financial/schemas/Liability.schema";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { createHistory } from "../../paymentHistory/createHistory";

export async function updateLiability(id: string, body: Liability) {
  try {
    await checkUserAuth();
    const { paymentSchedules, ...rest } = body;

    const { data, error } = await supabase
      .from("Liability")
      .update(rest)
      .eq("id", id);
    if (error) throw new Error(error.message);

    const createdAt = new Date();
    if (paymentSchedules && Array.isArray(paymentSchedules)) {
      for (const paymentSchedule of paymentSchedules) {
        if (paymentSchedule.id) {
          const { id: paymentScheduleId, ...updateData } = paymentSchedule;
          const { error: paymentSchedulesError } = await supabase
            .from("PaymentSchedule")
            .update(updateData)
            .eq("id", paymentScheduleId)
            .eq("liabilityId", id);
          if (paymentSchedulesError)
            throw new Error(paymentSchedulesError.message);
        } else {
          const { error: paymentSchedulesError } = await supabase
            .from("PaymentSchedule")
            .insert({
              ...paymentSchedule,
              liabilityId: id,
              createdAt,
            });
          if (paymentSchedulesError)
            throw new Error(paymentSchedulesError.message);
        }
      }
    }

    const history = {
      liabilityId: id,
      action: "Update",
      description: "Liability updated",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
