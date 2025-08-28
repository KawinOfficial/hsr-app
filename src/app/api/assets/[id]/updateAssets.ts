import { Asset } from "@/features/financial/schemas/Asset.schema";
import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { createHistory } from "../../paymentHistory/createHistory";

export async function updateAssets(id: string, body: Asset) {
  try {
    await checkUserAuth();
    const { maintances, ...rest } = body;

    const { data, error } = await supabase
      .from("Assets")
      .update(rest)
      .eq("id", id);
    if (error) throw new Error(error.message);

    const createdAt = new Date();
    if (maintances && Array.isArray(maintances)) {
      for (const maintance of maintances) {
        if (maintance.id) {
          const { id: maintanceId, ...updateData } = maintance;
          const { error: maintancesError } = await supabase
            .from("MaintenanceHistory")
            .update(updateData)
            .eq("id", maintanceId)
            .eq("assetId", id);
          if (maintancesError) throw new Error(maintancesError.message);
        } else {
          const { error: maintancesError } = await supabase
            .from("MaintenanceHistory")
            .insert({
              ...maintance,
              assetId: id,
              createdAt,
            });
          if (maintancesError) throw new Error(maintancesError.message);
        }
      }
    }

    const history = {
      assetId: id,
      action: "Update",
      description: "Asset updated",
    };
    await createHistory(history);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
