import { useFieldArray, useForm } from "react-hook-form";
import { Asset } from "@/features/financial/schemas/Asset.schema";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "@/features/financial/components/financial-provider";
import { AssetsContext } from "@/features/financial/components/assets-provider";
import { Maintance } from "@/features/financial/schemas/Maintance.schema";
import {
  useAssetDetail,
  useCreateAsset,
  useUpdateAsset,
} from "@/features/financial/hooks/use-assets";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useMemo } from "react";
import { formatDateInput } from "@/lib/format";
import { ProfileContext } from "@/features/profile/components/profile-provider";

export interface UseAssetsForm {
  onClose?: () => void;
}

const defaultMaintenance: Maintance = {
  name: "",
  description: "",
  date: "",
  cost: 0,
};

export const defaultValues: Asset = {
  name: "",
  description: "",
  amount: 0,
  purchaseDate: "",
  location: "",
  warrantyDate: "",
  documentTypesId: "",
  projectId: "",
  assetId: "",
  maintances: [],
};

export const useAssetsForm = ({ onClose }: UseAssetsForm) => {
  const { toast } = useToast();
  const projectOptions = useContextSelector(
    FinancialContext,
    (context) => context?.projectOptions
  );
  const documentTypes = useContextSelector(
    FinancialContext,
    (context) => context?.documentTypes
  );
  const selectedId = useContextSelector(
    AssetsContext,
    (state) => state?.selectedId
  );
  const refetch = useContextSelector(AssetsContext, (state) => state?.refetch);
  const userId = useContextSelector(
    ProfileContext,
    (context) => context?.userProfile?.id
  );
  const id = selectedId ?? "";
  const { data: assetDetail, isFetching: isLoadingAssetDetail } =
    useAssetDetail(id);
  const { mutate: createAsset, isPending: isLoadingCreateAsset } =
    useCreateAsset();
  const { mutate: updateAsset, isPending: isLoadingUpdateAsset } =
    useUpdateAsset(id);

  const methods = useForm<Asset>({ defaultValues });
  const { handleSubmit, reset, control, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "maintances",
  });

  const maintancesCost =
    watch("maintances")?.reduce((acc, curr) => acc + Number(curr.cost), 0) || 0;
  const amount = Number(watch("amount"));
  const getCurrentValue = amount - maintancesCost;
  const getDepreciation = (maintancesCost * 100) / amount || 0;
  const isLoading = useMemo(() => {
    return isLoadingAssetDetail || isLoadingCreateAsset || isLoadingUpdateAsset;
  }, [isLoadingAssetDetail, isLoadingCreateAsset, isLoadingUpdateAsset]);
  const canEdit = useMemo(() => {
    return !id || assetDetail?.createdBy === userId;
  }, [id, assetDetail?.createdBy, userId]);

  function createPayload(data: Asset) {
    return {
      ...data,
      purchaseDate: new Date(data.purchaseDate).toISOString(),
      warrantyDate: data.warrantyDate
        ? new Date(data.warrantyDate).toISOString()
        : null,
      amount: Number(data.amount),
      maintances: data.maintances?.map((maintance) => ({
        ...maintance,
        date: new Date(maintance.date).toISOString(),
        cost: Number(maintance.cost),
      })),
    };
  }

  function onSubmit(data: Asset) {
    const payload = createPayload(data);
    if (id) {
      updateAsset(payload, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Asset Updated",
            description: "Your asset has been updated successfully.",
          });
          refetch?.();
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Asset update failed";
          toast({
            variant: "destructive",
            title: "Asset Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createAsset(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Asset Created",
          description: "Your asset has been created successfully.",
        });
        refetch?.();
        onClose?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Asset creation failed";
        toast({
          variant: "destructive",
          title: "Asset Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    onClose?.();
  }

  function onAddMaintenance() {
    append(defaultMaintenance);
  }

  function onRemoveMaintenance(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (!assetDetail || !id) {
      reset(defaultValues);
      return;
    }
    const purchaseDate = formatDateInput(assetDetail?.purchaseDate ?? "");
    const warrantyDate = formatDateInput(assetDetail?.warrantyDate ?? "");
    const maintances =
      assetDetail?.maintances?.map((maintance) => ({
        ...maintance,
        date: formatDateInput(maintance.date ?? ""),
      })) ?? [];
    reset({
      ...assetDetail,
      purchaseDate,
      warrantyDate,
      maintances,
    });
  }, [assetDetail, reset, id]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    onReset,
    projectOptions,
    documentTypes,
    selectedId,
    onAddMaintenance,
    onRemoveMaintenance,
    fields,
    getCurrentValue,
    getDepreciation,
    isLoading,
    canEdit,
  };
};
