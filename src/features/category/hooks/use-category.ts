import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import {
  CategoryList,
  CategoryListSchema,
} from "@/features/category/schemas/Category.schema";

export const useCategory = ({
  page,
  limit,
  keyword,
}: {
  page: number;
  limit: number;
  keyword: string;
}) => {
  return useQuery({
    queryKey: ["categories", page, limit, keyword],
    queryFn: async () => {
      const response = await api
        .get<CategoryList>(API_ROUTES.categories, {
          searchParams: { page, limit, keyword },
        })
        .json();

      return validatedPromise<CategoryList>(
        response,
        CategoryListSchema,
        "categories"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
