import { checkUserAuth } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { Workflow } from "@/features/document-types/schemas/Workflow.schema";
import { NextResponse } from "next/server";
import { uniq } from "lodash";

export async function createNotification({
  paymentId,
  assetId,
  liabilityId,
  documentTypesId,
}: {
  paymentId?: string;
  assetId?: string;
  liabilityId?: string;
  documentTypesId?: string;
}) {
  try {
    const userId = await checkUserAuth();

    let filter: string | null = null;
    let filterValue: string | null = null;
    switch (true) {
      case !!paymentId:
        filter = "paymentId";
        filterValue = paymentId;
        break;
      case !!assetId:
        filter = "assetId";
        filterValue = assetId;
        break;
      case !!liabilityId:
        filter = "liabilityId";
        filterValue = liabilityId;
        break;
      default:
        throw new Error("Payment, asset, or liability ID is required");
    }
    const { data: existingNoti, error: existingNotiError } = await supabase
      .from("Notifications")
      .select("id")
      .eq(filter, filterValue)
      .maybeSingle();
    if (existingNotiError) throw new Error(existingNotiError.message);
    if (existingNoti) throw new Error("Notification already exists");

    const { data: documentTypesData, error: documentTypesError } =
      await supabase
        .from("DocumentTypes")
        .select("workflowId, ApprovalWorkflow(steps)")
        .eq("id", documentTypesId)
        .single();
    if (documentTypesError)
      throw new Error(documentTypesError.message || "Document type not found");

    const {
      ApprovalWorkflow: { steps },
    } = documentTypesData as unknown as { ApprovalWorkflow: Workflow };
    if (!steps.length) throw new Error("No steps found for the document type");

    const payload = {
      userIds: uniq([userId, ...steps.map((step) => step.userId)]),
      currentType:
        steps[0].type === "approval" ? "approval_request" : "completed",
      currentUserId: steps[0].userId,
      paymentId: paymentId || null,
      assetId: assetId || null,
      liabilityId: liabilityId || null,
    };

    const { error } = await supabase.from("Notifications").insert(payload);
    if (error) throw new Error(error.message);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
