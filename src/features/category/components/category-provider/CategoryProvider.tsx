"use client";

import { createContext } from "use-context-selector";
import { useCategoryProvider } from "./CategoryProvider.hook";

export const CategoryContext = createContext<ReturnType<
  typeof useCategoryProvider
> | null>(null);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useCategoryProvider();

  return (
    <CategoryContext.Provider value={context}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
