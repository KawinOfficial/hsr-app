import { useState } from "react";

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return {
    showPassword,
    setShowPassword,
  };
};
