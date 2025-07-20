"use client";

import { createContext } from "use-context-selector";
import { useWorkflowProvider } from "./WorkflowProvider.hook";

export const WorkflowContext = createContext<ReturnType<
  typeof useWorkflowProvider
> | null>(null);

const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useWorkflowProvider();

  return (
    <WorkflowContext.Provider value={context}>
      {children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowProvider;
