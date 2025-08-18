import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import {
  DepartmentList,
  DepartmentListSchema,
} from "@/features/departments/schemas/Department.schema";

export const useDepartmentList = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await api
        .get<{ data: DepartmentList }>(API_ROUTES.departments)
        .json();
      return validatedPromise<DepartmentList>(
        response?.data,
        DepartmentListSchema,
        "departments"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
