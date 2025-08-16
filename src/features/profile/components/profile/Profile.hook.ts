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
    roleId: "",
    departmentId: "",
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
  const options = useContextSelector(ProfileContext, (state) => state?.options);

  const { register, reset, control, watch, handleSubmit } = useForm<Profile>({
    defaultValues,
  });
  const form = {
    fieldFirstName: register("firstName"),
    fieldLastName: register("lastName"),
    fieldEmail: register("email"),
    fieldPhoneNumber: register("phoneNumber"),
    fieldEmployeeId: register("employeeInfo.employeeId"),
    fieldRoleId: register("employeeInfo.roleId"),
    fieldDepartmentId: register("employeeInfo.departmentId"),
    fieldManagerName: register("employeeInfo.managerName"),
    fieldWorkLocation: register("employeeInfo.workLocation"),
    fieldNationality: register("nationality"),
    fieldOtherNationality: register("otherNationality"),
    watch,
    control,
  };

  function onCancel() {
    reset(userProfile);
    setEditMode?.(false);
  }

  function onSubmit(data: Profile) {
    handleSaveProfile?.(data);
  }

  useEffect(() => {
    if (!userProfile || isFetching) return;
    reset(userProfile);
  }, [userProfile, reset]);

  return {
    userProfile,
    editMode,
    setEditMode,
    form,
    isFetching,
    onCancel,
    onSubmit: handleSubmit(onSubmit),
    departments: options?.departments || [],
    roles: options?.roles || [],
  };
};
