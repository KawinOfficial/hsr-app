"use client";

import { createContext } from "use-context-selector";
import { useDocumentProvider } from "./DocumentProvider.hook";

export const DocumentContext = createContext<ReturnType<
  typeof useDocumentProvider
> | null>(null);

const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useDocumentProvider();

  return (
    <DocumentContext.Provider value={context}>
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
