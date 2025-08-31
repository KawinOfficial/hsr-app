import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";
import { ApprovalList, ApprovalListSchema } from "../schemas/Approval.schema";

export const useApprovals = () => {
  return useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const response = await api
        .get<{ data: ApprovalList }>(API_ROUTES.approvals)
        .json();
      return validatedPromise<ApprovalList>(
        response.data,
        ApprovalListSchema,
        "approvals"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
