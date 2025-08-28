import { Maintance } from "@/features/financial/schemas/Maintance.schema";
import { createHistory } from "../paymentHistory/createHistory";
import { checkUserAuth, getCurrentUser } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { generatePaymentId } from "@/lib/format";

export async function createAssets(request: NextRequest) {
  try {
    await checkUserAuth();

    const body = await request.json();
    const { maintances, ...asset } = body;
    const user = await getCurrentUser();
    const now = new Date();
    const createdAt = now.toISOString();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    const { data: lastAssets, error: fetchError } = await supabase
      .from("Assets")
      .select("assetId")
      .ilike("assetId", `AST-${month}${year}-%`)
      .order("createdAt", { ascending: false })
      .limit(1);
    if (fetchError) throw new Error(fetchError.message);
    const lastAssetId =
      lastAssets && lastAssets.length > 0 ? lastAssets[0].assetId : null;
    const assetId = generatePaymentId("AST", lastAssetId, month, year);

    const { data, error } = await supabase
      .from("Assets")
      .insert({
        ...asset,
        createdBy: user?.id,
        createdAt,
        assetId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (maintances) {
      const { error: maintancesError } = await supabase
        .from("MaintenanceHistory")
        .insert(
          maintances.map((maintance: Maintance) => ({
            ...maintance,
            createdAt,
            assetId: data?.id,
          }))
        );
      if (maintancesError) throw new Error(maintancesError.message);
    }

    const history = {
      assetId: data?.id,
      action: "Create",
      description: "Asset created",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
