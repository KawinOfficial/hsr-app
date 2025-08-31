import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const tableMap = {
  payment: "paymentId",
  asset: "assetId",
  liability: "liabilityId",
};

export async function deleteHistory({
  id,
  type,
}: {
  id: string;
  type: "payment" | "asset" | "liability";
}) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("PaymentHistory")
      .delete()
      .eq(tableMap[type], id);
    if (error) throw new Error(error.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
