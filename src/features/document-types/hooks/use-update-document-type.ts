import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { DocumentType } from "../schemas/DocumentTypes.schema";
import { pathToUrl } from "@/lib/router";

export const useUpdateDocumentType = ({ id }: { id: string }) => {
  return useMutation({
    mutationKey: ["update-document-type"],
    mutationFn: async (documentType: DocumentType) => {
      return await api
        .put(pathToUrl(API_ROUTES.documentTypeDetail, { id }), {
          json: documentType,
        })
        .json();
    },
  });
};
