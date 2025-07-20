import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";

export const useDocumentDialog = () => {
  const detailViewOpen = useContextSelector(
    DocumentContext,
    (state) => state?.detailViewOpen
  );
  const setDetailViewOpen = useContextSelector(
    DocumentContext,
    (state) => state?.setDetailViewOpen
  );
  const selectedDocumentType = useContextSelector(
    DocumentContext,
    (state) => state?.selectedDocumentType
  );

  return { detailViewOpen, setDetailViewOpen, selectedDocumentType };
};
