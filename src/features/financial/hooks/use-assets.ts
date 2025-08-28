import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import { pathToUrl } from "@/lib/router";
import {
  Asset,
  AssetSchema,
  AssetsList,
  AssetsListSchema,
} from "../schemas/Asset.schema";

export const useAssetsList = ({
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
    queryKey: ["assets", page, limit, keyword, projectId],
    queryFn: async () => {
      const response = await api
        .get<AssetsList>(API_ROUTES.assets, {
          searchParams: { page, limit, keyword, projectId },
        })
        .json();
      return validatedPromise<AssetsList>(response, AssetsListSchema, "assets");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export function useAssetDetail(id: string) {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const response = await api
        .get<{ data: Asset }>(pathToUrl(API_ROUTES.assetsDetail, { id }))
        .json();
      return validatedPromise<Asset>(response.data, AssetSchema, "asset");
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export function useCreateAsset() {
  return useMutation({
    mutationKey: ["create-asset"],
    mutationFn: async (asset: Asset) => {
      return await api.post(API_ROUTES.assets, { json: asset }).json();
    },
  });
}

export function useUpdateAsset(id: string) {
  return useMutation({
    mutationKey: ["update-asset"],
    mutationFn: async (asset: Asset) => {
      return await api
        .put(pathToUrl(API_ROUTES.assetsDetail, { id }), {
          json: asset,
        })
        .json();
    },
  });
}

export function useDeleteAsset(id: string) {
  return useMutation({
    mutationKey: ["delete-asset"],
    mutationFn: async () => {
      return await api
        .delete(pathToUrl(API_ROUTES.assetsDetail, { id }))
        .json();
    },
  });
}
