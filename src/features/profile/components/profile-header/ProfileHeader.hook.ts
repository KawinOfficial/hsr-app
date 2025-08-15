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
  const options = useContextSelector(ProfileContext, (state) => state?.options);

  const role =
    options?.roles.find(
      (role) => role.value === userProfile?.employeeInfo?.roleId
    )?.label || "-";
  const department =
    options?.departments.find(
      (department) =>
        department.value === userProfile?.employeeInfo?.departmentId
    )?.label || "-";

  return {
    userProfile,
    setProfileImageOpen,
    role,
    department,
  };
};
