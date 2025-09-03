import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";
import { useTotalDocument } from "@/features/document-types/hooks/use-total-document";

export const useSummaryStats = () => {
  const documentTypes = useContextSelector(
    DocumentContext,
    (state) => state?.documentTypes
  );
  const workflows = useContextSelector(
    DocumentContext,
    (state) => state?.workflows
  );
  const { data: totalDocument } = useTotalDocument();
  const avgProcessingTime = useMemo(() => {
    if (!workflows || workflows.length === 0) return 0;
    const stepTimes = workflows.map((workflow) => {
      return workflow.steps.reduce(
        (sum, step) => sum + Number(step.timeLimit),
        0
      );
    });
    const avgTime =
      stepTimes.reduce((sum, time) => sum + time, 0) / stepTimes.length;

    if (avgTime >= 24) {
      const days = avgTime / 24;
      const formattedDays = Number.isInteger(days) ? days : days.toFixed(1);
      return `${formattedDays} day${days !== 1 ? "s" : ""}`;
    }
    return `${avgTime} hour${avgTime !== 1 ? "s" : ""}`;
  }, [workflows]);

  return { documentTypes, workflows, avgProcessingTime, totalDocument };
};
