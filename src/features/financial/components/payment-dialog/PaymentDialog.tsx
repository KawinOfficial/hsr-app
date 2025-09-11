"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePaymentDialog } from "./PaymentDialog.hook";
import PaymentForm from "@/features/financial/components/payment-form/PaymentForm";

const PaymentDialog = () => {
  const { paymentOpen, setPaymentOpen, handleClosePayment, selectedId } =
    usePaymentDialog();

  return (
    <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
      <DialogContent className="max-w-[90vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6">
          <DialogTitle>
            {selectedId ? "Edit Payment" : "Create New Payment"}
          </DialogTitle>
          <DialogDescription>
            {selectedId
              ? "Edit the payment details"
              : "Fill in the payment details to start the approval workflow"}
          </DialogDescription>
        </DialogHeader>
        <PaymentForm onClose={handleClosePayment} />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
