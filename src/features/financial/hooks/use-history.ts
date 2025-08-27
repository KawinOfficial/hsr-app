import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import { HistoryList, HistoryListSchema } from "../schemas/History.schema";
import { validatedPromise } from "@/lib/promise";

export const useHistory = ({
  page,
  limit,
  paymentId,
  assetId,
  liabilityId,
}: {
  page: number;
  limit: number;
  paymentId?: string;
  assetId?: string;
  liabilityId?: string;
}) => {
  return useQuery({
    queryKey: ["history", page, limit, paymentId, assetId, liabilityId],
    queryFn: async () => {
      const response = await api
        .get<HistoryList>(API_ROUTES.paymentHistory, {
          searchParams: {
            page,
            limit,
            paymentId: paymentId ?? "",
            assetId: assetId ?? "",
            liabilityId: liabilityId ?? "",
          },
        })
        .json();

      return validatedPromise<HistoryList>(
        response,
        HistoryListSchema,
        "history"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!paymentId || !!assetId || !!liabilityId,
  });
};
