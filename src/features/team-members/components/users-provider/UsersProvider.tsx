"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useUsersProvider } from "./UsersProvider.hook";

export const UsersContext = createContext<ReturnType<
  typeof useUsersProvider
> | null>(null);

const UsersProvider = ({
  children,
  projectId,
}: PropsWithChildren<{ projectId?: string }>) => {
  const context = useUsersProvider({ projectId });
  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
