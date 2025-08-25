import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { pathToUrl } from "@/lib/router";

export const useDeleteCategory = ({ id }: { id: string }) => {
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async () => {
      return await api
        .delete(pathToUrl(API_ROUTES.categoryDetail, { id }))
        .json();
    },
  });
};
