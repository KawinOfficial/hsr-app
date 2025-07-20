import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";

export const useProfile = () => {
  const userProfile = useContextSelector(
    ProfileContext,
    (state) => state?.userProfile
  );
  const editMode = useContextSelector(
    ProfileContext,
    (state) => state?.editMode
  );

  return { userProfile, editMode };
};
