import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getAssetsDetail(id: string) {
  try {
    await checkUserAuth();

    const { data, error } = await supabase
      .from("Assets")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);

    const { data: maintances, error: maintancesError } = await supabase
      .from("MaintenanceHistory")
      .select("*")
      .eq("assetId", id)
      .order("createdAt", { ascending: false });
    if (maintancesError) throw new Error(maintancesError.message);

    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications")
      .select("currentType,remark")
      .eq("assetId", id)
      .maybeSingle();
    if (notificationsError) throw new Error(notificationsError.message);

    const formattedData = {
      ...data,
      maintances,
      status: notifications?.currentType,
      remark: notifications?.remark,
    };

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
