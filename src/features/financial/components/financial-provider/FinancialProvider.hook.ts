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

export const useFinancialProvider = () => {
  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();

  return {
    financialSummary,

    documentTypes,
    projectOptions,
  };
};
