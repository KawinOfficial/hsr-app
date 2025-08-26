import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { DocumentType } from "../schemas/DocumentTypes.schema";

export const useCreateDocumentType = () => {
  return useMutation({
    mutationKey: ["create-document-type"],
    mutationFn: async (documentType: DocumentType) => {
      return await api
        .post(API_ROUTES.documentTypes, { json: documentType })
        .json();
    },
  });
};
