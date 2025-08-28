import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { Category } from "@/features/category/schemas/Category.schema";

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (category: Category) => {
      return await api
        .post(API_ROUTES.categories, {
          json: category,
        })
        .json();
    },
  });
};
