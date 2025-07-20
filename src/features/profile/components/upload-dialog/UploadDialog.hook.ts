import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useUploadDialog = () => {
  const profileImageOpen = useContextSelector(
    ProfileContext,
    (state) => state?.profileImageOpen
  );
  const setProfileImageOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setProfileImageOpen
  );
  const userProfile = useContextSelector(
    ProfileContext,
    (state) => state?.userProfile
  );
  return { profileImageOpen, setProfileImageOpen, userProfile };
};
