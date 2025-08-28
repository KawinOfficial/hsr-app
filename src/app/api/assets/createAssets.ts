import { Maintance } from "@/features/financial/schemas/Maintance.schema";
import { createHistory } from "../paymentHistory/createHistory";
import { checkUserAuth, getCurrentUser } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

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
    let runningNumber = 1;
    if (lastAssets && lastAssets.length > 0) {
      const lastAssetId = lastAssets[0].assetId;
      const match = lastAssetId.match(/AST-\d{4}-(\d+)/);
      if (match && match[1]) {
        runningNumber = parseInt(match[1], 10) + 1;
      }
    }
    const assetId = `AST-${month}${year}-${runningNumber
      .toString()
      .padStart(4, "0")}`;

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
