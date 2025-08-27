import { useState } from "react";
import { Asset } from "@/features/financial/schemas/Asset.schema";
import { Liability } from "@/features/financial/schemas/Liability.schema";
import { Payment } from "@/features/financial/schemas/Payment.schema";
import { useDocumentTypeOptions, useProjectOptions } from "@/hooks/use-option";

const financialSummary = {
  totalBudget: 2850000000,
  totalPaid: 1420000000,
  pendingPayments: 145000000,
  advancePayments: 89000000,
  totalAssets: 892000000,
  totalLiabilities: 234000000,
  cashFlow: 156000000,
  monthlyBurn: 78000000,
};

export type FinancialItem =
  | {
      item: Asset;
      type: "asset";
    }
  | {
      item: Liability;
      type: "liability";
    }
  | {
      item: Payment;
      type: "payment";
    };

export type FinancialType = "asset" | "liability" | "payment";

export const useFinancialProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FinancialItem>();
  const [editMode, setEditMode] = useState(false);

  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    setEditMode(false);
  }

  function handleSave() {
    setEditMode(false);
  }

  function handleViewItem(
    item: Asset | Liability | Payment,
    type: FinancialType
  ) {
    setSelectedItem({ item, type } as FinancialItem);
    handleOpen();
  }

  return {
    financialSummary,
    isOpen,
    selectedItem,
    editMode,
    setIsOpen,
    handleOpen,
    handleClose,
    handleViewItem,
    handleEdit,
    handleCancel,
    handleSave,

    documentTypes,
    projectOptions,
  };
};
