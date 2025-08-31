import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getAssets({
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
      .from("Assets")
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
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    if (!data.length) {
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

    const assetIds = data.map((item) => item.id);
    const { data: notifications, error: notificationsError } = await supabase
      .from("Notifications")
      .select("currentType,assetId,editedIds")
      .in("assetId", assetIds)
      .order("updatedAt", { ascending: false });
    if (notificationsError) throw new Error(notificationsError.message);
    const notificationMap = new Map(
      (notifications ?? []).map((n) => [n.assetId, n.currentType])
    );
    const formattedData = data.map((item) => ({
      ...item,
      status: notificationMap.get(item.id) || "N/A",
      canDelete: !(
        notifications.find((n) => n.assetId === item.id)?.editedIds?.length ?? 0
      ),
    }));

    return NextResponse.json({
      status: "success",
      data: formattedData,
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
