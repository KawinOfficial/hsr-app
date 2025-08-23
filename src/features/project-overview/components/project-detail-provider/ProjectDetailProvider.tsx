"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useProjectDetailProvider } from "./ProjectDetailProvider.hook";

export const ProjectDetailContext = createContext<ReturnType<
  typeof useProjectDetailProvider
> | null>(null);

export const ProjectDetailProvider = ({
  children,
  id,
}: PropsWithChildren<{ id: string }>) => {
  const context = useProjectDetailProvider({ id });
  return (
    <ProjectDetailContext.Provider value={context}>
      {children}
    </ProjectDetailContext.Provider>
  );
};
