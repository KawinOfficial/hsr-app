"use client";

import { createContext } from "use-context-selector";
import { usePermissionProvider } from "./PermissionProvider.hook";

export const PermissionContext = createContext<ReturnType<
  typeof usePermissionProvider
> | null>(null);

const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const context = usePermissionProvider();

  return (
    <PermissionContext.Provider value={context}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
