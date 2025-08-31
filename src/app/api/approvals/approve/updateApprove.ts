import { Workflow } from "@/features/document-types/schemas/Workflow.schema";
import { checkUserAuth, getStatus } from "@/lib/promise";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function updateApprove(req: Request) {
  try {
    const userId = await checkUserAuth();
    if (!userId) throw new Error("User not found");
    const { id, documentTypesId, isRejected, remark, isInReview } =
      await req.json();

    const { data: notiData, error: notiError } = await supabase
      .from("Notifications")
      .select("editedIds")
      .eq("id", id)
      .maybeSingle();
    if (notiError) throw new Error(notiError.message);

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

    const editedIds = [...(notiData?.editedIds ?? []), userId];
    const filterStep = steps.filter((step) => !editedIds.includes(step.userId));
    const status = getStatus(filterStep[0].type);

    const payload = isRejected
      ? {
          ...notiData,
          currentType: "rejected",
          currentUserId: null,
          remark,
          editedIds: [...(notiData?.editedIds ?? []), userId],
        }
      : isInReview
      ? {
          ...notiData,
          currentType: "inReview",
          currentUserId: userId,
        }
      : {
          ...notiData,
          currentType: status,
          currentUserId: status === "completed" ? null : filterStep[0].userId,
          editedIds: editedIds,
        };

    const { error } = await supabase
      .from("Notifications")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);

    return NextResponse.json({ message: "Approve updated" });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
