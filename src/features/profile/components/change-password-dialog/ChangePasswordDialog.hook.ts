import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "../profile-provider";
import { useState } from "react";

export const useChangePasswordDialog = () => {
  const changePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.changePasswordOpen
  );
  const setChangePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setChangePasswordOpen
  );

  const [showPassword, setShowPassword] = useState(false);

  return {
    changePasswordOpen,
    setChangePasswordOpen,
    showPassword,
    setShowPassword,
  };
};
