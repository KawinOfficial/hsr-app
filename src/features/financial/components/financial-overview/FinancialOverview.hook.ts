import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "../financial-provider";

export const useFinancialOverview = () => {
  const financialSummary = useContextSelector(
    FinancialContext,
    (state) => state?.financialSummary
  );

  return { financialSummary };
};
