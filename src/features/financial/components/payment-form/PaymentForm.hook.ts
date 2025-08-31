import { useForm } from "react-hook-form";
import { Payment } from "@/features/financial/schemas/Payment.schema";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "@/features/financial/components/financial-provider/FinancialProvider";
import { useEffect, useMemo } from "react";
import {
  useCreatePayment,
  usePaymentDetail,
  useUpdatePayment,
} from "@/features/financial/hooks/use-payment";
import { toast } from "@/components/ui/use-toast";
import { PaymentContext } from "@/features/financial/components/payment-provider";
import { formatDateInput } from "@/lib/format";
import { ProfileContext } from "@/features/profile/components/profile-provider";

const defaultValues: Payment = {
  name: "",
  paymentId: "",
  description: "",
  amount: 0,
  paymentDate: "",
  priority: "",
  vendor: "",
  documentTypesId: "",
  projectId: "",
  tax: 0,
  vat: 7,
};

export interface UsePaymentForm {
  onClose?: () => void;
}

export const usePaymentForm = ({ onClose }: UsePaymentForm) => {
  const projectOptions = useContextSelector(
    FinancialContext,
    (context) => context?.projectOptions
  );
  const documentTypes = useContextSelector(
    FinancialContext,
    (context) => context?.documentTypes
  );
  const selectedId = useContextSelector(
    PaymentContext,
    (context) => context?.selectedId
  );
  const refetch = useContextSelector(
    PaymentContext,
    (context) => context?.refetch
  );
  const userId = useContextSelector(
    ProfileContext,
    (context) => context?.userProfile?.id
  );
  const id = selectedId ?? "";
  const { data: paymentDetail, isFetching: isLoadingPaymentDetail } =
    usePaymentDetail(id);
  const { mutate: createPayment, isPending: isLoadingCreatePayment } =
    useCreatePayment();
  const { mutate: updatePayment, isPending: isLoadingUpdatePayment } =
    useUpdatePayment(id);

  const methods = useForm<Payment>({ defaultValues });
  const { handleSubmit, reset, watch } = methods;

  const vatAmount = watch("amount") * ((watch("vat") ?? 0) / 100);
  const taxAmount = watch("amount") * ((watch("tax") ?? 0) / 100);
  const netAmount = watch("amount") - vatAmount - taxAmount;
  const isLoading = useMemo(() => {
    return (
      isLoadingPaymentDetail || isLoadingCreatePayment || isLoadingUpdatePayment
    );
  }, [isLoadingPaymentDetail, isLoadingCreatePayment, isLoadingUpdatePayment]);
  const canEdit = useMemo(() => {
    return !id || paymentDetail?.createdBy === userId;
  }, [id, paymentDetail?.createdBy, userId]);

  function createPayload(data: Payment) {
    return {
      ...data,
      vat: Number(data.vat) || 0,
      tax: Number(data.tax) || 0,
      amount: Number(data.amount) || 0,
      paymentDate: new Date(data.paymentDate).toISOString(),
    };
  }

  function onSubmit(data: Payment) {
    const payload = createPayload(data);
    if (id) {
      updatePayment(payload, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Payment Updated",
            description: "Your payment has been updated successfully.",
          });
          refetch?.();
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Payment update failed";
          toast({
            variant: "destructive",
            title: "Payment Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createPayment(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Payment Created",
          description: "Your payment has been created successfully.",
        });
        refetch?.();
        onClose?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Payment creation failed";
        toast({
          variant: "destructive",
          title: "Payment Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    onClose?.();
  }

  useEffect(() => {
    if (!paymentDetail || !id) {
      reset(defaultValues);
      return;
    }
    const paymentDate = formatDateInput(paymentDetail?.paymentDate ?? "");
    reset({
      ...paymentDetail,
      paymentDate,
    });
  }, [paymentDetail, reset, id]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    onReset,
    projectOptions,
    documentTypes,
    vatAmount,
    taxAmount,
    netAmount,
    selectedId,
    history,
    isLoading,
    canEdit,
  };
};
