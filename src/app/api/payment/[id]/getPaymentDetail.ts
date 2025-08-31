import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getPaymentDetail(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Payment")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);

    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications")
      .select("currentType,remark")
      .eq("paymentId", id)
      .maybeSingle();
    if (notificationsError) throw new Error(notificationsError.message);

    return NextResponse.json({
      data: {
        ...data,
        status: notifications?.currentType,
        remark: notifications?.remark,
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
