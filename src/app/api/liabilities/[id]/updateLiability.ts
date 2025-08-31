import { Liability } from "@/features/financial/schemas/Liability.schema";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { createHistory } from "../../paymentHistory/createHistory";

export async function updateLiability(id: string, body: Liability) {
  try {
    await checkUserAuth();

    const { paymentSchedules, ...liabilityData } = body;

    const { data, error } = await supabase
      .from("Liability")
      .update(liabilityData)
      .eq("id", id);
    if (error) throw new Error(error.message);

    if (Array.isArray(paymentSchedules)) {
      const createdAt = new Date();
      for (const schedule of paymentSchedules) {
        if (schedule.id) {
          const { id: paymentScheduleId, ...updateData } = schedule;
          const { error: updateError } = await supabase
            .from("PaymentSchedule")
            .update(updateData)
            .eq("id", paymentScheduleId)
            .eq("liabilityId", id);
          if (updateError) throw new Error(updateError.message);
        } else {
          const { error: insertError } = await supabase
            .from("PaymentSchedule")
            .insert({
              ...schedule,
              liabilityId: id,
              createdAt,
            });
          if (insertError) throw new Error(insertError.message);
        }
      }
    }

    await createHistory({
      liabilityId: id,
      action: "Update",
      description: "Liability updated",
    });

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
