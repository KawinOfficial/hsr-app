import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContextSelector } from "use-context-selector";
import { useDeletePayment } from "@/features/financial/hooks/use-payment";
import { PaymentContext } from "@/features/financial/components/payment-provider";
import { useDeleteAsset } from "@/features/financial/hooks/use-assets";

export interface UseDeletePaymentDialog {
  type: "payment" | "asset" | "liability";
  id: string;
}

export const useDeletePaymentDialog = ({
  id,
  type,
}: UseDeletePaymentDialog) => {
  const { toast } = useToast();
  const refetch = useContextSelector(
    PaymentContext,
    (context) => context?.refetch
  );

  const [open, setOpen] = useState(false);
  const { mutate: deletePayment, isPending } = useDeletePayment(id);
  const { mutate: deleteAsset, isPending: isDeletingAsset } =
    useDeleteAsset(id);

  const isLoading = isPending || isDeletingAsset;

  function onDelete() {
    switch (type) {
      case "payment":
        onDeletePayment();
        break;
      case "asset":
        onDeleteAsset();
        break;
      // case "liability":
      //   onDeleteLiability();
      //   break;
      default:
        break;
    }
  }

  function onDeletePayment() {
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

  function onDeleteAsset() {
    deleteAsset(undefined, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Asset Deleted",
          description: "Your asset has been deleted successfully.",
        });
        setOpen(false);
        refetch?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Asset Deletion Failed",
          description: errorMessage,
        });
      },
    });
  }

  return { open, setOpen, onDelete, isLoading };
};
