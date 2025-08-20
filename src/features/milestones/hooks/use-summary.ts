import { useQuery } from "@tanstack/react-query";
import { Summary, SummarySchema } from "../schemas/Summary.schema";
import { validatedPromise } from "@/lib/promise";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";

export const useSummary = () => {
  return useQuery({
    queryKey: ["milestone-summary"],
    queryFn: async () => {
      const response = await api
        .get<{ data: Summary }>(API_ROUTES.milestoneSummary)
        .json();

      return validatedPromise<Summary>(
        response.data,
        SummarySchema,
        "milestone-summary"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
