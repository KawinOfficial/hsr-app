import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function getTotalDocument({
  documentTypesId,
}: {
  documentTypesId?: string[];
}) {
  try {
    await checkUserAuth();

    let paymentQuery = supabase
      .from("Payment")
      .select("id", { count: "exact" });
    let assetQuery = supabase.from("Assets").select("id", { count: "exact" });
    let liabilityQuery = supabase
      .from("Liability")
      .select("id", { count: "exact" });

    if (documentTypesId) {
      paymentQuery = paymentQuery.eq("documentTypesId", documentTypesId);
      assetQuery = assetQuery.eq("documentTypesId", documentTypesId);
      liabilityQuery = liabilityQuery.eq("documentTypesId", documentTypesId);
    }

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

    return {
      documentTypesId,
      paymentCount,
      assetCount,
      liabilityCount,
      totalCount,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}

export async function getDocumentTypes({
  page,
  limit,
  keyword,
  categoryId,
}: {
  page: number;
  limit: number;
  keyword?: string;
  categoryId?: string;
}) {
  try {
    await checkUserAuth();

    let query = supabase
      .from("DocumentTypes")
      .select("*", { count: "exact" })
      .range((page - 1) * limit, page * limit - 1)
      .order("updatedAt", { ascending: false })
      .eq("isDeleted", false);

    if (keyword) {
      query = query.filter("name", "ilike", `%${keyword}%`);
    }

    if (categoryId) {
      query = query.eq("categoryId", categoryId);
    }
    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    const totalDocument = data
      ? await Promise.all(
          data.map((item) => getTotalDocument({ documentTypesId: item.id }))
        ).then((res) => res)
      : [];

    const dataWithCounts = data?.map((item, index) => ({
      ...item,
      totalDocuments: totalDocument[index],
    }));

    return NextResponse.json({
      status: "success",
      data: dataWithCounts,
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
