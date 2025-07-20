"use client";

import { createContext } from "use-context-selector";
import { useDepartmentProvider } from "./DepartmentProvider.hook";

export const DepartmentContext = createContext<ReturnType<
  typeof useDepartmentProvider
> | null>(null);

const DepartmentProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useDepartmentProvider();
  return (
    <DepartmentContext.Provider value={context}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
