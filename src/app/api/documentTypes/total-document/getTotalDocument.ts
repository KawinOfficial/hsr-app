import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getTotalDocument() {
  try {
    await checkUserAuth();

    const paymentQuery = supabase
      .from("Payment")
      .select("id", { count: "exact" });
    const assetQuery = supabase.from("Assets").select("id", { count: "exact" });
    const liabilityQuery = supabase
      .from("Liability")
      .select("id", { count: "exact" });

    const [
      { error: paymentError, count: paymentCount },
      { error: assetError, count: assetCount },
      { error: liabilityError, count: liabilityCount },
    ] = await Promise.all([paymentQuery, assetQuery, liabilityQuery]);

    if (paymentError) throw new Error(paymentError.message);
    if (assetError) throw new Error(assetError.message);
    if (liabilityError) throw new Error(liabilityError.message);

    const totalCount =
      (paymentCount ?? 0) + (assetCount ?? 0) + (liabilityCount ?? 0);

    return NextResponse.json({
      status: "success",
      data: {
        paymentCount,
        assetCount,
        liabilityCount,
        totalCount,
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
