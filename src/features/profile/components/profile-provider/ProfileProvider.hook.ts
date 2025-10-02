import {
  useProfile,
  useUpdateProfile,
} from "@/features/auths/hook/use-profile";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { useOptions } from "@/hooks/use-option";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";

export const useProfileProvider = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const { data: options, isFetching: isOptionsFetching } = useOptions();
  const { data: userProfile, isFetching, refetch } = useProfile();
  const { mutate: mutateProfile, isPending: isUpdating } = useUpdateProfile();

  const handleSaveProfile = useCallback(
    (data: Profile) => {
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
            error instanceof Error ? error.message : "Failed to update profile";
          toast({
            variant: "destructive",
            title: "Update Failed",
            description: errorMessage,
          });
        },
      });
    },
    [mutateProfile, toast, refetch]
  );

  const onChangePassword = useCallback(() => {
    setChangePasswordOpen(true);
  }, []);

  const toggleEditMode = useCallback((value: boolean) => {
    setEditMode(value);
  }, []);

  const toggleProfileImageOpen = useCallback((value: boolean) => {
    setProfileImageOpen(value);
  }, []);

  const toggleChangePasswordOpen = useCallback((value: boolean) => {
    setChangePasswordOpen(value);
  }, []);

  return {
    editMode,
    setEditMode: toggleEditMode,
    profileImageOpen,
    setProfileImageOpen: toggleProfileImageOpen,
    userProfile,
    handleSaveProfile,
    changePasswordOpen,
    setChangePasswordOpen: toggleChangePasswordOpen,
    onChangePassword,
    isFetching: isFetching || isOptionsFetching,
    isUpdating,
    options,
  };
};
