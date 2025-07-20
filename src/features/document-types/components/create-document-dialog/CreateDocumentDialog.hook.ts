import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useCreateDocumentDialog = () => {
  const createOpen = useContextSelector(
    DocumentContext,
    (state) => state?.createOpen
  );
  const setCreateOpen = useContextSelector(
    DocumentContext,
    (state) => state?.setCreateOpen
  );
  const workflowTemplates = useContextSelector(
    WorkflowContext,
    (state) => state?.workflowTemplates
  );

  return { createOpen, setCreateOpen, workflowTemplates };
};
