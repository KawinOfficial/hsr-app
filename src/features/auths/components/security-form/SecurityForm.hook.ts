import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useSecurityForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const password = watch("password");

  const passwordRequirements = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const getPasswordStrength = useMemo(() => {
    const score = Object.values(passwordRequirements).filter(
      (req) => req
    ).length;
    return (score / 5) * 100;
  }, [passwordRequirements]);

  const getPasswordStrengthLabel = useMemo(() => {
    const score = Object.values(passwordRequirements).filter(
      (req) => req
    ).length;
    if (score <= 1) return "Very Weak";
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  }, [passwordRequirements]);

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrength,
    getPasswordStrengthLabel,
    passwordRequirements,
    register,
    errors,
  };
};
