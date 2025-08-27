"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useAssetsProvider } from "./AssetsProvider.hook";

export const AssetsContext = createContext<ReturnType<
  typeof useAssetsProvider
> | null>(null);

export const AssetsProvider = ({ children }: PropsWithChildren) => {
  const context = useAssetsProvider();
  return (
    <AssetsContext.Provider value={context}>{children}</AssetsContext.Provider>
  );
};
