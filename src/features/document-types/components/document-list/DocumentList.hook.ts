import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";

export const useDocumentList = () => {
  const documentTypes = useContextSelector(
    DocumentContext,
    (state) => state?.documentTypes
  );
  const setCreateOpen = useContextSelector(
    DocumentContext,
    (state) => state?.setCreateOpen
  );
  const handleDetailView = useContextSelector(
    DocumentContext,
    (state) => state?.handleDetailView
  );

  return { documentTypes, setCreateOpen, handleDetailView };
};
