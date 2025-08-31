import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function deleteNotification({
  paymentId,
  assetId,
  liabilityId,
}: {
  paymentId?: string;
  assetId?: string;
  liabilityId?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase.from("Notifications").delete();
    if (paymentId) {
      query = query.eq("paymentId", paymentId);
    }
    if (assetId) {
      query = query.eq("assetId", assetId);
    }
    if (liabilityId) {
      query = query.eq("liabilityId", liabilityId);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
