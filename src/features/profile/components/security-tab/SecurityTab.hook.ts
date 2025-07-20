import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useSecurityTab = () => {
  const userProfile = useContextSelector(
    ProfileContext,
    (state) => state?.userProfile
  );
  const setChangePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setChangePasswordOpen
  );

  return { userProfile, setChangePasswordOpen };
};
