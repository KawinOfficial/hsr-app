import { useContextSelector } from "use-context-selector";
import { PaymentContext } from "../payment-provider";

const documentTypes = {
  "purchase-request": {
    name: "Purchase Request",
    workflow: [
      "Project Manager",
      "Procurement Department",
      "Finance Department",
    ],
    description: "Request for purchasing materials or services",
  },
  "purchase-order": {
    name: "Purchase Order",
    workflow: [
      "Procurement Department",
      "Finance Department",
      "Top Management",
    ],
    description: "Official order for goods or services",
  },
  "contract-agreement": {
    name: "Contract Agreement",
    workflow: [
      "Project Manager",
      "Procurement Department",
      "Finance Department",
      "Top Management",
    ],
    description: "Legal contract with suppliers or contractors",
  },
  invoice: {
    name: "Invoice",
    workflow: ["Project Manager", "Finance Department"],
    description: "Payment request from suppliers",
  },
  "payment-request": {
    name: "Payment Request",
    workflow: ["Project Manager", "Finance Department", "Top Management"],
    description: "Request for payment processing",
  },
  "work-delivery": {
    name: "Work Delivery Note",
    workflow: ["Project Manager", "QS Department", "Finance Department"],
    description: "Confirmation of work completion and delivery",
  },
};

const projectOptions = [
  { value: "TH-CN-001", label: "TH-CN-001 - Bangkok-Nakhon" },
  { value: "TH-CN-002", label: "TH-CN-002 - Nakhon-Nong Khai" },
  { value: "TH-CN-003", label: "TH-CN-003 - Rolling Stock" },
];

export const usePaymentDialog = () => {
  const paymentOpen = useContextSelector(
    PaymentContext,
    (state) => state?.paymentOpen
  );
  const setPaymentOpen = useContextSelector(
    PaymentContext,
    (state) => state?.setPaymentOpen
  );
  const handleClosePayment = useContextSelector(
    PaymentContext,
    (state) => state?.handleClosePayment
  );
  const selectedId = useContextSelector(
    PaymentContext,
    (state) => state?.selectedId
  );

  return {
    documentTypes,
    projectOptions,
    paymentOpen,
    setPaymentOpen,
    handleClosePayment,
    selectedId,
  };
};
