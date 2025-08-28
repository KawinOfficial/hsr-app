import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { pathToUrl } from "@/lib/router";

export const useDeleteDocumentType = () => {
  return useMutation({
    mutationKey: ["delete-document-type"],
    mutationFn: async (id: string) => {
      return await api
        .delete(pathToUrl(API_ROUTES.documentTypeDetail, { id }))
        .json();
    },
  });
};
