"use client";

import { createContext } from "use-context-selector";
import { useProfileProvider } from "./ProfileProvider.hook";

export const ProfileContext = createContext<ReturnType<
  typeof useProfileProvider
> | null>(null);

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useProfileProvider();
  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
