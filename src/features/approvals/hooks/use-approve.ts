import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useMutation } from "@tanstack/react-query";
import { ApproveForm } from "../schemas/Approval.schema";

export const useApprove = () => {
  return useMutation({
    mutationKey: ["approve"],
    mutationFn: async (payload: ApproveForm) =>
      await api.post(API_ROUTES.approve, { json: payload }).json(),
  });
};
