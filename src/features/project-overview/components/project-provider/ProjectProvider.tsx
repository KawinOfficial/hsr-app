"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useProjectProvider } from "./ProjectProvider.hook";

export const ProjectContext = createContext<ReturnType<
  typeof useProjectProvider
> | null>(null);

export const ProjectProvider = ({ children }: PropsWithChildren) => {
  const context = useProjectProvider();
  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  );
};
