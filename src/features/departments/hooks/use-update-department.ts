import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { DepartmentForm } from "@/features/departments/schemas/Department.schema";

export const useUpdateDepartment = () => {
  return useMutation({
    mutationKey: ["update-department"],
    mutationFn: async (department: DepartmentForm) => {
      return await api
        .put(API_ROUTES.departments, {
          body: JSON.stringify(department),
        })
        .json();
    },
  });
};
