import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useMutation } from "@tanstack/react-query";
import { PermissionGroup } from "../schemas/Permission.schema";

export const useUpdatePermission = () => {
  return useMutation({
    mutationKey: ["update-permission"],
    mutationFn: (data: PermissionGroup) =>
      api.put(API_ROUTES.permissions, {
        body: JSON.stringify(data),
      }),
  });
};
