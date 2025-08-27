import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContextSelector } from "use-context-selector";
import { useDeletePayment } from "../../hooks/use-payment";
import { PaymentContext } from "../payment-provider";

export interface UseDeletePaymentDialog {
  id: string;
}

export const useDeletePaymentDialog = ({ id }: UseDeletePaymentDialog) => {
  const { toast } = useToast();
  const refetch = useContextSelector(
    PaymentContext,
    (context) => context?.refetch
  );

  const [open, setOpen] = useState(false);
  const { mutate: deletePayment, isPending } = useDeletePayment(id);

  function onDelete() {
    deletePayment(undefined, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Payment Deleted",
          description: "Your payment has been deleted successfully.",
        });
        setOpen(false);
        refetch?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Payment Deletion Failed",
          description: errorMessage,
        });
      },
    });
  }

  return { open, setOpen, onDelete, isLoading: isPending };
};
