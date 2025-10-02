import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";
import { useMemo } from "react";

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

  const role = useMemo(() => {
    if (!userProfile?.employeeInfo?.roleId || !options?.roles) return "-";
    return (
      options.roles.find(
        (role) => role.value === userProfile.employeeInfo!.roleId
      )?.label || "-"
    );
  }, [userProfile?.employeeInfo?.roleId, options?.roles]);

  const department = useMemo(() => {
    if (!userProfile?.employeeInfo?.departmentId || !options?.departments)
      return "-";
    return (
      options.departments.find(
        (department) =>
          department.value === userProfile.employeeInfo!.departmentId
      )?.label || "-"
    );
  }, [userProfile?.employeeInfo?.departmentId, options?.departments]);

  return {
    userProfile,
    setProfileImageOpen,
    role,
    department,
  };
};
