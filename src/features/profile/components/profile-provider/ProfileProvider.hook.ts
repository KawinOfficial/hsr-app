import {
  useProfile,
  useUpdateProfile,
} from "@/features/auths/hook/use-profile";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { useOptions } from "@/hooks/use-option";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const useProfileProvider = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const { data: options, isFetching: isOptionsFetching } = useOptions();
  const { data: userProfile, isFetching, refetch } = useProfile();
  const { mutate: mutateProfile } = useUpdateProfile();

  function handleSaveProfile(data: Profile) {
    mutateProfile(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setEditMode(false);
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onChangePassword() {
    setChangePasswordOpen(true);
  }

  return {
    editMode,
    setEditMode,
    profileImageOpen,
    setProfileImageOpen,
    userProfile,
    handleSaveProfile,
    changePasswordOpen,
    setChangePasswordOpen,
    onChangePassword,
    isFetching: isFetching || isOptionsFetching,
    options,
  };
};
