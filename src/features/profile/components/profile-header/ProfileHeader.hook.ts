import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useProfileHeader = () => {
  const userProfile = useContextSelector(
    ProfileContext,
    (state) => state?.userProfile
  );
  const setProfileImageOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setProfileImageOpen
  );

  return {
    userProfile,
    setProfileImageOpen,
  };
};
