"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useMilestonesTrackerProvider } from "./MilestonesTrackerProvider.hook";

export const MilestonesTrackerContext = createContext<ReturnType<
  typeof useMilestonesTrackerProvider
> | null>(null);

export const MilestonesTrackerProvider = ({ children }: PropsWithChildren) => {
  const context = useMilestonesTrackerProvider();
  return (
    <MilestonesTrackerContext.Provider value={context}>
      {children}
    </MilestonesTrackerContext.Provider>
  );
};
