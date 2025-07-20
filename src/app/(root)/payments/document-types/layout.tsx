import { DocumentProvider } from "@/features/document-types/components/document-provider";
import { WorkflowProvider } from "@/features/document-types/components/workflow-provider";

export default function DocumentTypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocumentProvider>
      <WorkflowProvider>{children}</WorkflowProvider>
    </DocumentProvider>
  );
}
