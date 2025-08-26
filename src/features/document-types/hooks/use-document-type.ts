import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import {
  DocumentList,
  DocumentListSchema,
} from "@/features/document-types/schemas/DocumentTypes.schema";

export const useDocumentType = ({
  page,
  limit,
  keyword,
  categoryId,
}: {
  page: number;
  limit: number;
  keyword: string;
  categoryId: string;
}) => {
  return useQuery({
    queryKey: ["document-type", page, limit, keyword, categoryId],
    queryFn: async () => {
      const response = await api
        .get(API_ROUTES.documentTypes, {
          searchParams: { page, limit, keyword, categoryId },
        })
        .json();

      return validatedPromise<DocumentList>(
        response,
        DocumentListSchema,
        "document-type"
      );
    },
    retry: false,
  });
};
