"use client";

import { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { useNotificationProvider } from "./NotificationProvider.hook";

export const NotificationContext = createContext<ReturnType<
  typeof useNotificationProvider
> | null>(null);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const context = useNotificationProvider();
  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};
