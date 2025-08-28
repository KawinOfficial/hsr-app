"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useLiabilityProvider } from "./LiabilityProvider.hook";

export const LiabilityContext = createContext<ReturnType<
  typeof useLiabilityProvider
> | null>(null);

export const LiabilityProvider = ({ children }: PropsWithChildren) => {
  const context = useLiabilityProvider();
  return (
    <LiabilityContext.Provider value={context}>
      {children}
    </LiabilityContext.Provider>
  );
};
