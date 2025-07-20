import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useSummaryStats = () => {
  const documentTypes = useContextSelector(
    DocumentContext,
    (state) => state?.documentTypes
  );
  const workflowTemplates = useContextSelector(
    WorkflowContext,
    (state) => state?.workflowTemplates
  );

  return { documentTypes, workflowTemplates };
};
