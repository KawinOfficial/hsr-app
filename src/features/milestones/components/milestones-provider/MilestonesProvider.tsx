"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useMilestonesProvider } from "./MilestonesProvider.hook";

export const MilestonesContext = createContext<ReturnType<
  typeof useMilestonesProvider
> | null>(null);

export const MilestonesProvider = ({ children }: PropsWithChildren) => {
  const context = useMilestonesProvider();
  return (
    <MilestonesContext.Provider value={context}>
      {children}
    </MilestonesContext.Provider>
  );
};
