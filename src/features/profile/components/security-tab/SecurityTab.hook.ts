import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useSecurityTab = () => {
  const setChangePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setChangePasswordOpen
  );

  return { setChangePasswordOpen };
};
