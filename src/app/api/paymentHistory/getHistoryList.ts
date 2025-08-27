import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkUserAuth } from "@/lib/promise";

export async function getHistoryList({
  page,
  limit,
  paymentId,
  assetId,
  liabilityId,
}: {
  page: number;
  limit: number;
  paymentId?: string;
  assetId?: string;
  liabilityId?: string;
}) {
  try {
    if (!paymentId && !assetId && !liabilityId) {
      throw new Error("ID is required");
    }

    await checkUserAuth();

    let query = supabase
      .from("PaymentHistory")
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false });
    if (paymentId) {
      query = query.eq("paymentId", paymentId);
    }
    if (assetId) {
      query = query.eq("assetId", assetId);
    }
    if (liabilityId) {
      query = query.eq("liabilityId", liabilityId);
    }
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({
      status: "success",
      data,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil((count ?? 0) / limit),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
