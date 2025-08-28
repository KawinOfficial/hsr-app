import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { Category } from "@/features/category/schemas/Category.schema";
import { pathToUrl } from "@/lib/router";

export const useUpdateCategory = ({ id }: { id: string }) => {
  return useMutation({
    mutationKey: ["update-category"],
    mutationFn: async (category: Category) => {
      return await api
        .put(pathToUrl(API_ROUTES.categoryDetail, { id }), {
          json: category,
        })
        .json();
    },
  });
};
