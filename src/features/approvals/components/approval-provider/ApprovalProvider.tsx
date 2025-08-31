"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useApprovalProvider } from "./ApprovalProvider.hook";

export const ApprovalContext = createContext<ReturnType<
  typeof useApprovalProvider
> | null>(null);

export const ApprovalProvider = ({ children }: PropsWithChildren) => {
  const context = useApprovalProvider();
  return (
    <ApprovalContext.Provider value={context}>
      {children}
    </ApprovalContext.Provider>
  );
};
