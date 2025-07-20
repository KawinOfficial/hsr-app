import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useProfileHeader = () => {
  const userProfile = useContextSelector(
    ProfileContext,
    (state) => state?.userProfile
  );
  const editMode = useContextSelector(
    ProfileContext,
    (state) => state?.editMode
  );
  const setEditMode = useContextSelector(
    ProfileContext,
    (state) => state?.setEditMode
  );
  const profileImageOpen = useContextSelector(
    ProfileContext,
    (state) => state?.profileImageOpen
  );
  const setProfileImageOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setProfileImageOpen
  );
  const handleSaveProfile = useContextSelector(
    ProfileContext,
    (state) => state?.handleSaveProfile
  );

  return {
    userProfile,
    editMode,
    setEditMode,
    profileImageOpen,
    setProfileImageOpen,
    handleSaveProfile,
  };
};
