import { useFieldArray, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { useEffect, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatDateInput } from "@/lib/format";
import { FinancialContext } from "@/features/financial/components/financial-provider";
import { LiabilityContext } from "@/features/financial/components/liability-provider";
import { Liability } from "@/features/financial/schemas/Liability.schema";
import { PaymentSchedule } from "@/features/financial/schemas/PaymentSchedule.schema";
import {
  useLiabilityDetail,
  useCreateLiability,
  useUpdateLiability,
} from "@/features/financial/hooks/use-liability";
import { ProfileContext } from "@/features/profile/components/profile-provider";

export interface UseLiabilityForm {
  onClose?: () => void;
}

const defaultPaymentSchedule: PaymentSchedule = {
  description: "",
  amount: 0,
  dueDate: "",
  liabilityId: "",
};

export const defaultValues: Liability = {
  name: "",
  description: "",
  amount: 0,
  dueDate: "",
  terms: "",
  creditor: "",
  interestRate: 0,
  documentTypesId: "",
  projectId: "",
  priority: "",
  paymentSchedules: [defaultPaymentSchedule],
  liabilityId: "",
};

export const useLiabilityForm = ({ onClose }: UseLiabilityForm) => {
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
    LiabilityContext,
    (state) => state?.selectedId
  );
  const refetch = useContextSelector(
    LiabilityContext,
    (state) => state?.refetch
  );
  const userId = useContextSelector(
    ProfileContext,
    (context) => context?.userProfile?.id
  );
  const canUpdate = useContextSelector(
    FinancialContext,
    (context) => context?.canUpdate
  );
  const id = selectedId ?? "";
  const { data: liabilityDetail, isFetching: isLoadingLiabilityDetail } =
    useLiabilityDetail(id);
  const { mutate: createLiability, isPending: isLoadingCreateLiability } =
    useCreateLiability();
  const { mutate: updateLiability, isPending: isLoadingUpdateLiability } =
    useUpdateLiability(id);

  const methods = useForm<Liability>({ defaultValues });
  const { handleSubmit, reset, control, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentSchedules",
  });

  const totalAmount =
    watch("paymentSchedules")?.reduce(
      (acc, field) => acc + Number(field.amount ?? 0),
      0
    ) ?? 0;
  const isExceedTotalAmount = Boolean(
    watch("amount") && totalAmount > watch("amount")
  );
  const isLoading = useMemo(() => {
    return (
      isLoadingLiabilityDetail ||
      isLoadingCreateLiability ||
      isLoadingUpdateLiability
    );
  }, [
    isLoadingLiabilityDetail,
    isLoadingCreateLiability,
    isLoadingUpdateLiability,
  ]);
  const isRejected = useMemo(() => {
    return liabilityDetail?.status === "rejected";
  }, [liabilityDetail?.status]);
  const isCompleted = useMemo(() => {
    return liabilityDetail?.status === "completed";
  }, [liabilityDetail?.status]);
  const canEdit = useMemo(() => {
    return (
      (!id || liabilityDetail?.createdBy === userId) &&
      !isRejected &&
      !isCompleted &&
      canUpdate
    );
  }, [
    id,
    liabilityDetail?.createdBy,
    userId,
    isRejected,
    isCompleted,
    canUpdate,
  ]);

  function createPayload(data: Liability) {
    return {
      ...data,
      status: undefined,
      remark: undefined,
      canDelete: undefined,
      userCreatedBy: undefined,
    };
  }

  function onSubmit(data: Liability) {
    const payload = createPayload(data);
    if (id) {
      updateLiability(payload, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Liability Updated",
            description: "Your liability has been updated successfully.",
          });
          refetch?.();
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Liability update failed";
          toast({
            variant: "destructive",
            title: "Liability Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createLiability(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Liability Created",
          description: "Your liability has been created successfully.",
        });
        refetch?.();
        onClose?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Liability creation failed";
        toast({
          variant: "destructive",
          title: "Liability Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    onClose?.();
  }

  function onAddPaymentSchedule() {
    append(defaultPaymentSchedule);
  }

  function onRemovePaymentSchedule(index: number) {
    remove(index);
  }

  function calcPaymentScheduleStatus(date?: string) {
    if (!date) return "-";
    const today = new Date();
    const dueDate = new Date(date);
    if (dueDate <= today) return "Scheduled";
    if (dueDate > today) return "Upcoming";
  }

  useEffect(() => {
    if (!liabilityDetail || !id) {
      reset(defaultValues);
      return;
    }
    const paymentSchedules =
      liabilityDetail?.paymentSchedules?.map((paymentSchedule) => ({
        ...paymentSchedule,
        dueDate: formatDateInput(paymentSchedule.dueDate ?? ""),
      })) ?? [];
    reset({
      ...liabilityDetail,
      dueDate: formatDateInput(liabilityDetail.dueDate ?? ""),
      paymentSchedules,
    });
  }, [liabilityDetail, reset, id]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    onReset,
    projectOptions,
    documentTypes,
    selectedId,
    onAddPaymentSchedule,
    onRemovePaymentSchedule,
    fields,
    calcPaymentScheduleStatus,
    totalAmount,
    isExceedTotalAmount,
    isLoading,
    canEdit,
    isRejected,
    liabilityDetail,
  };
};
