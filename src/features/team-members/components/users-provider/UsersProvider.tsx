"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useUsersProvider } from "./UsersProvider.hook";

export const UsersContext = createContext<ReturnType<
  typeof useUsersProvider
> | null>(null);

const UsersProvider = ({ children }: PropsWithChildren) => {
  const context = useUsersProvider();
  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
