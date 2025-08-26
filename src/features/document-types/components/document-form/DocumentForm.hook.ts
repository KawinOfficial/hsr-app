import { useForm } from "react-hook-form";
import { DocumentType } from "@/features/document-types/schemas/DocumentTypes.schema";
import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "../document-provider";
import { useCreateDocumentType } from "../../hooks/use-create-document-type";
import { useToast } from "@/hooks/use-toast";
import { useUpdateDocumentType } from "../../hooks/use-update-document-type";
import { useEffect } from "react";

const defaultValues: DocumentType = {
  name: "",
  description: "",
  categoryId: "",
  workflowId: "",
  documentId: "",
  isActive: true,
};

export interface UseDocumentForm {
  onClose: () => void;
}

export const useDocumentForm = ({ onClose }: UseDocumentForm) => {
  const { toast } = useToast();
  const categories = useContextSelector(
    DocumentContext,
    (context) => context?.categories
  );
  const workflows = useContextSelector(
    DocumentContext,
    (context) => context?.workflows
  );
  const refetch = useContextSelector(
    DocumentContext,
    (context) => context?.refetch
  );
  const setSelectedDocumentType = useContextSelector(
    DocumentContext,
    (context) => context?.setSelectedDocumentType
  );
  const selectedDocumentType = useContextSelector(
    DocumentContext,
    (context) => context?.selectedDocumentType
  );

  const { mutate: createDocumentType } = useCreateDocumentType();
  const { mutate: updateDocumentType } = useUpdateDocumentType({
    id: selectedDocumentType?.id ?? "",
  });

  const methods = useForm<DocumentType>({
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  function onSubmit(data: DocumentType) {
    if (selectedDocumentType?.id) {
      updateDocumentType(data, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Workflow Updated",
            description: "Your workflow has been updated successfully.",
          });
          refetch?.();
          setSelectedDocumentType?.(null);
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Workflow update failed";
          toast({
            variant: "destructive",
            title: "Workflow Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createDocumentType(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Workflow Created",
          description: "Your workflow has been created successfully.",
        });
        refetch?.();
        onClose?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Workflow creation failed";
        toast({
          variant: "destructive",
          title: "Workflow Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    onClose();
  }

  useEffect(() => {
    if (!selectedDocumentType) {
      reset(defaultValues);
      return;
    }
    reset(selectedDocumentType);
  }, [reset, selectedDocumentType]);

  return {
    categories,
    workflows,
    methods,
    selectedDocumentType,
    onSubmit: handleSubmit(onSubmit),
    onReset,
  };
};
