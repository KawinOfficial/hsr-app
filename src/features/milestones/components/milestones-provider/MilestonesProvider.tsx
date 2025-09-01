"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useMilestonesProvider } from "./MilestonesProvider.hook";

export const MilestonesContext = createContext<ReturnType<
  typeof useMilestonesProvider
> | null>(null);

export const MilestonesProvider = ({
  children,
  projectId,
}: PropsWithChildren<{ projectId?: string }>) => {
  const context = useMilestonesProvider({ projectId });
  return (
    <MilestonesContext.Provider value={context}>
      {children}
    </MilestonesContext.Provider>
  );
};
