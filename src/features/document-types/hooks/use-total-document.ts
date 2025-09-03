import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import {
  TotalDocument,
  TotalDocumentSchema,
} from "../schemas/DocumentTypes.schema";
import { validatedPromise } from "@/lib/promise";

export const useTotalDocument = () => {
  return useQuery({
    queryKey: ["total-document"],
    queryFn: async () => {
      const response = await api
        .get<{ data: TotalDocument }>(API_ROUTES.totalDocument)
        .json();
      return validatedPromise<TotalDocument>(
        response.data,
        TotalDocumentSchema,
        "total-document"
      );
    },
  });
};
