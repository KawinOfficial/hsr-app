import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getApproval() {
  try {
    const userId = await checkUserAuth();
    if (!userId) throw new Error("User not found");

    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications")
      .select("*,currentUserId,currentUser:User(firstName,lastName)")
      .eq("currentUserId", userId)
      .order("updatedAt", { ascending: false });
    if (notificationsError) throw new Error(notificationsError.message);

    const { paymentIds, assetIds, liabilityIds } = notifications?.reduce(
      (acc, item) => {
        if (item.paymentId) acc.paymentIds.push(item.paymentId);
        if (item.assetId) acc.assetIds.push(item.assetId);
        if (item.liabilityId) acc.liabilityIds.push(item.liabilityId);
        return acc;
      },
      { paymentIds: [], assetIds: [], liabilityIds: [] }
    ) ?? { paymentIds: [], assetIds: [], liabilityIds: [] };

    const [
      { data: paymentData = [], error: paymentError },
      { data: assetData = [], error: assetError },
      { data: liabilityData = [], error: liabilityError },
    ] = await Promise.all([
      paymentIds.length
        ? supabase.from("Payment").select("*").in("id", paymentIds)
        : Promise.resolve({ data: [], error: null }),
      assetIds.length
        ? supabase.from("Assets").select("*").in("id", assetIds)
        : Promise.resolve({ data: [], error: null }),
      liabilityIds.length
        ? supabase.from("Liability").select("*").in("id", liabilityIds)
        : Promise.resolve({ data: [], error: null }),
    ]);
    if (paymentError) throw new Error(paymentError.message);
    if (assetError) throw new Error(assetError.message);
    if (liabilityError) throw new Error(liabilityError.message);

    const paymentMap = Object.fromEntries(
      (paymentData || []).map((p) => [p.id, p])
    );
    const assetMap = Object.fromEntries(
      (assetData || []).map((a) => [a.id, a])
    );
    const liabilityMap = Object.fromEntries(
      (liabilityData || []).map((l) => [l.id, l])
    );

    const formattedData = (notifications || []).map((item) => {
      if (item.paymentId && paymentMap[item.paymentId]) {
        return { ...item, payment: paymentMap[item.paymentId] };
      }
      if (item.assetId && assetMap[item.assetId]) {
        return { ...item, asset: assetMap[item.assetId] };
      }
      if (item.liabilityId && liabilityMap[item.liabilityId]) {
        return { ...item, liability: liabilityMap[item.liabilityId] };
      }
      return item;
    });

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
