import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";

export const useCreateDocumentDialog = () => {
  const createOpen = useContextSelector(
    DocumentContext,
    (state) => state?.createOpen
  );
  const setCreateOpen = useContextSelector(
    DocumentContext,
    (state) => state?.setCreateOpen
  );
  const selectedDocumentType = useContextSelector(
    DocumentContext,
    (state) => state?.selectedDocumentType
  );

  return { createOpen, setCreateOpen, selectedDocumentType };
};
