import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function deleteAssets(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase.from("Assets").delete().eq("id", id);
    if (error) throw new Error(error.message);
    const { error: maintancesError } = await supabase
      .from("MaintenanceHistory")
      .delete()
      .eq("assetId", id);
    if (maintancesError) throw new Error(maintancesError.message);

    return NextResponse.json({ data });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
