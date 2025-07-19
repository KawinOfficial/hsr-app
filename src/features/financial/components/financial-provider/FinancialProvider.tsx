"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useFinancialProvider } from "./FinancialProvider.hook";

export const FinancialContext = createContext<ReturnType<
  typeof useFinancialProvider
> | null>(null);

export const FinancialProvider = ({ children }: PropsWithChildren) => {
  const context = useFinancialProvider();
  return (
    <FinancialContext.Provider value={context}>
      {children}
    </FinancialContext.Provider>
  );
};
