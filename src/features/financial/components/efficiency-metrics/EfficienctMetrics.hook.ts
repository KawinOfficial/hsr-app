import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";
import { useAssetsList } from "@/features/financial/hooks/use-assets";
import { useLiabilitiesList } from "@/features/financial/hooks/use-liability";
import { usePaymentList } from "@/features/financial/hooks/use-payment";
import { FinancialContext } from "../financial-provider";

export const useEfficiencyMetrics = () => {
  const selectedProject = useContextSelector(
    FinancialContext,
    (state) => state?.selectedProject
  );

  const query = useMemo(
    () => ({
      page: 1,
      limit: 999,
      keyword: "",
      projectId: selectedProject ?? "",
    }),
    [selectedProject]
  );
  const { data: assets } = useAssetsList(query);
  const { data: liabilities } = useLiabilitiesList(query);
  const { data: payments } = usePaymentList(query);

  function gross(amount: number, vat = 0, tax = 0) {
    return amount * (1 + vat / 100 + tax / 100);
  }

  const calculateEVM = useMemo(() => {
    const today = new Date();

    // Actual Cost (AC) & Earned Value (EV)
    const acPayments = payments?.data
      ?.filter((p) => ["completed"].includes(p.status ?? ""))
      .reduce((sum, p) => sum + gross(p.amount, p.vat, p.tax), 0);

    const acAssets = assets?.data
      ?.filter((a) => ["completed"].includes(a.status ?? ""))
      .reduce((sum, a) => sum + a.amount, 0);

    const AC = (acPayments ?? 0) + (acAssets ?? 0);
    const EV = AC;

    // Budget at Completion (BAC)
    const BAC = liabilities?.data?.reduce((sum, l) => sum + l.amount, 0) ?? 0;

    // Planned Value (PV): straight-line from createdAt → dueDate
    const PV = liabilities?.data?.reduce((sum, l) => {
      const start = new Date(l.createdAt ?? "");
      const end = new Date(l.dueDate ?? "");
      const duration = Math.max(end.getTime() - start.getTime(), 1);
      const elapsed = today.getTime() - start.getTime();
      const frac = Math.max(0, Math.min(1, elapsed / duration));
      return sum + l.amount * frac;
    }, 0);

    // Metrics
    const CPI = AC ? EV / AC : 0;
    const SPI = PV ? EV / PV : 0;
    const EAC = CPI ? BAC / CPI : 0;
    const VAC = EAC ? BAC - EAC : 0;

    return {
      AC,
      BAC,
      EV,
      PV,
      CPI: Number(CPI.toFixed(2)),
      SPI: Number(SPI.toFixed(2)),
      EAC,
      VAC,
    };
  }, [assets, liabilities, payments]);

  return { calculateEVM };
};
