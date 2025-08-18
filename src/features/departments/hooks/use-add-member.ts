import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useMutation } from "@tanstack/react-query";

export const useAddMember = () => {
  return useMutation({
    mutationKey: ["add-member"],
    mutationFn: async (payload: {
      userIds: string[];
      departmentId: string;
    }) => {
      return await api
        .put(API_ROUTES.departmentAddMember, { body: JSON.stringify(payload) })
        .json();
    },
  });
};
