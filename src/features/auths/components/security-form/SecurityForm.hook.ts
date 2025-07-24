import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const useSecurityForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const {} = useFormContext();

  function getPasswordStrength() {
    const score = Object.values(passwordRequirements).filter(
      (req) => req
    ).length;
    return (score / 5) * 100;
  }

  function getPasswordStrengthLabel() {
    const score = Object.values(passwordRequirements).filter(
      (req) => req
    ).length;
    if (score <= 1) return "Very Weak";
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  }

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrength,
    getPasswordStrengthLabel,
    passwordRequirements,
    setPasswordRequirements,
  };
};
