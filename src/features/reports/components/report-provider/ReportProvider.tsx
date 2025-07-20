"use client";

import { createContext } from "use-context-selector";
import { useReportProvider } from "./ReportProvider.hook";

export const ReportContext = createContext<ReturnType<
  typeof useReportProvider
> | null>(null);

const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useReportProvider();
  return (
    <ReportContext.Provider value={context}>{children}</ReportContext.Provider>
  );
};

export default ReportProvider;
