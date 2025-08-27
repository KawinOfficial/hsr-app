"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { usePaymentProvider } from "./PaymentProvider.hook";

export const PaymentContext = createContext<ReturnType<
  typeof usePaymentProvider
> | null>(null);

export const PaymentProvider = ({ children }: PropsWithChildren) => {
  const context = usePaymentProvider();
  return (
    <PaymentContext.Provider value={context}>
      {children}
    </PaymentContext.Provider>
  );
};
