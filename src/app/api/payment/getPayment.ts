import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getPayment({
  page,
  limit,
  keyword,
  projectId,
}: {
  page: number;
  limit: number;
  keyword?: string;
  projectId?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("Payment")
      .select("*,createdBy,userCreatedBy:User(firstName,lastName)", {
        count: "exact",
      })
      .order("updatedAt", { ascending: false });
    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }
    if (projectId) {
      query = query.eq("projectId", projectId);
    }
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    query = query.range(from, to);
    const { data: payments, error: paymentError, count } = await query;
    if (paymentError) throw new Error(paymentError.message);

    if (!payments.length) {
      return NextResponse.json({
        status: "success",
        data: [],
        pagination: {
          totalItems: count ?? 0,
          totalPages: Math.ceil((count ?? 0) / limit),
          currentPage: Number(page),
          itemsPerPage: Number(limit),
        },
      });
    }

    const paymentIds = payments.map((item) => item.id);
    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications")
      .select("currentType,paymentId,editedIds")
      .in("paymentId", paymentIds)
      .order("updatedAt", { ascending: false });
    if (notificationsError) throw new Error(notificationsError.message);
    const notificationMap = new Map(
      (notifications ?? []).map((n) => [n.paymentId, n.currentType])
    );
    const formattedData = payments.map((item) => ({
      ...item,
      status: notificationMap.get(item.id) || "N/A",
      canDelete: !(
        notifications.find((n) => n.paymentId === item.id)?.editedIds?.length ??
        0
      ),
    }));

    return NextResponse.json({
      status: "success",
      data: formattedData,
      pagination: {
        totalItems: count ?? 0,
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
