import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";
import {
  useForm,
  UseFormRegister,
  Control,
  UseFormWatch,
} from "react-hook-form";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { ProfileFormSchema } from "../../schemas/Option.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

const defaultValues: Partial<Profile> = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  nationality: "",
  otherNationality: "",
  employeeInfo: {
    id: "",
    userId: "",
    employeeId: "",
    roleId: "",
    departmentId: "",
    managerName: "",
    workLocation: "",
  },
};

interface ProfileForm {
  register: UseFormRegister<Profile>;
  control: Control<Profile>;
  watch: UseFormWatch<Profile>;
}

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
  const onChangePassword = useContextSelector(
    ProfileContext,
    (state) => state?.onChangePassword
  );
  const options = useContextSelector(ProfileContext, (state) => state?.options);

  const formMethods = useForm<Profile>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(ProfileFormSchema),
  });

  const { register, reset, control, watch, handleSubmit } = formMethods;

  const form: ProfileForm = useMemo(
    () => ({
      register,
      control,
      watch,
    }),
    [register, control, watch]
  );

  const departments = useMemo(
    () => options?.departments || [],
    [options?.departments]
  );

  const roles = useMemo(() => options?.roles || [], [options?.roles]);

  const onCancel = () => {
    if (userProfile) {
      reset(userProfile);
    }
    setEditMode?.(false);
  };

  const onSubmit = (data: Profile) => {
    handleSaveProfile?.(data);
  };

  useEffect(() => {
    if (!userProfile || isFetching) return;
    reset(userProfile);
  }, [userProfile, reset, isFetching]);

  return {
    userProfile,
    editMode,
    setEditMode,
    form,
    isFetching,
    onCancel,
    onSubmit: handleSubmit(onSubmit),
    departments,
    roles,
    onChangePassword,
  };
};
