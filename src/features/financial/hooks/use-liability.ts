import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import { pathToUrl } from "@/lib/router";
import {
  LiabilitiesList,
  LiabilitiesListSchema,
  Liability,
  LiabilitySchema,
} from "@/features/financial/schemas/Liability.schema";

export const useLiabilitiesList = ({
  page,
  limit,
  keyword,
  projectId,
}: {
  page: number;
  limit: number;
  keyword: string;
  projectId: string;
}) => {
  return useQuery({
    queryKey: ["liabilities", page, limit, keyword, projectId],
    queryFn: async () => {
      const response = await api
        .get<LiabilitiesList>(API_ROUTES.liabilities, {
          searchParams: { page, limit, keyword, projectId },
        })
        .json();
      return validatedPromise<LiabilitiesList>(
        response,
        LiabilitiesListSchema,
        "liabilities"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export function useLiabilityDetail(id: string) {
  return useQuery({
    queryKey: ["liability", id],
    queryFn: async () => {
      const response = await api
        .get<{ data: Liability }>(
          pathToUrl(API_ROUTES.liabilitiesDetail, { id })
        )
        .json();
      return validatedPromise<Liability>(
        response.data,
        LiabilitySchema,
        "liability"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useCreateLiability() {
  return useMutation({
    mutationKey: ["create-liability"],
    mutationFn: async (liability: Liability) => {
      return await api.post(API_ROUTES.liabilities, { json: liability }).json();
    },
  });
}

export function useUpdateLiability(id: string) {
  return useMutation({
    mutationKey: ["update-liability"],
    mutationFn: async (liability: Liability) => {
      return await api
        .put(pathToUrl(API_ROUTES.liabilitiesDetail, { id }), {
          json: liability,
        })
        .json();
    },
  });
}

export function useDeleteLiability(id: string) {
  return useMutation({
    mutationKey: ["delete-liability"],
    mutationFn: async () => {
      return await api
        .delete(pathToUrl(API_ROUTES.liabilitiesDetail, { id }))
        .json();
    },
  });
}
