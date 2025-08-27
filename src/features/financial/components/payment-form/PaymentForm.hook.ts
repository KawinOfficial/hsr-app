import { useForm } from "react-hook-form";
import { Payment } from "@/features/financial/schemas/Payment.schema";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "../financial-provider/FinancialProvider";
import { useEffect } from "react";
import {
  useCreatePayment,
  usePaymentDetail,
  useUpdatePayment,
} from "@/features/financial/hooks/use-payment";
import { toast } from "@/components/ui/use-toast";
import { PaymentContext } from "../payment-provider";

const approvalHistory = [
  {
    date: "2024-02-15 09:30",
    action: "Created",
    user: "Siriporn Wattana",
    role: "Finance Manager",
    comment: "Initial request created",
  },
  {
    date: "2024-02-15 14:20",
    action: "Reviewed",
    user: "Somchai Tanakorn",
    role: "Project Manager",
    comment: "Reviewed and approved",
  },
  {
    date: "2024-02-16 10:15",
    action: "Processed",
    user: "Malee Jitpakdee",
    role: "Accounts Payable",
    comment: "Payment processed via bank transfer",
  },
];

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
  vat: 0,
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

  const id = selectedId ?? "";
  const { data: paymentDetail } = usePaymentDetail(id);
  const { mutate: createPayment } = useCreatePayment();
  const { mutate: updatePayment } = useUpdatePayment(id);

  const methods = useForm<Payment>({ defaultValues });
  const { handleSubmit, reset, watch } = methods;

  const vatAmount = watch("amount") * ((watch("vat") ?? 0) / 100);
  const taxAmount = watch("amount") * ((watch("tax") ?? 0) / 100);
  const netAmount = watch("amount") - vatAmount - taxAmount;

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
    reset(paymentDetail);
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

    approvalHistory,
  };
};
