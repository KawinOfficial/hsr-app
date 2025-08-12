import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";
import { useForm } from "react-hook-form";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { useEffect } from "react";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  employeeInfo: {
    employeeId: "",
    position: "",
    department: "",
    managerName: "",
    workLocation: "",
  },
};

export const useProfile = () => {
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
  const handleSaveProfile = useContextSelector(
    ProfileContext,
    (state) => state?.handleSaveProfile
  );
  const isFetching = useContextSelector(
    ProfileContext,
    (state) => state?.isFetching
  );

  const { register, reset, control } = useForm<Profile>({
    defaultValues,
  });
  const form = {
    fieldFirstName: register("firstName"),
    fieldLastName: register("lastName"),
    fieldEmail: register("email"),
    fieldPhoneNumber: register("phoneNumber"),
    fieldEmployeeId: register("employeeInfo.employeeId"),
    fieldPosition: register("employeeInfo.position"),
    fieldDepartment: register("employeeInfo.department"),
    fieldManagerName: register("employeeInfo.managerName"),
    fieldWorkLocation: register("employeeInfo.workLocation"),
    fieldNationality: register("nationality"),
    control,
  };

  useEffect(() => {
    if (!userProfile) return;

    reset(userProfile);
  }, [userProfile, reset]);

  return {
    userProfile,
    editMode,
    setEditMode,
    handleSaveProfile,
    form,
    isFetching,
  };
};
