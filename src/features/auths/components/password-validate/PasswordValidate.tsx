"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

const PasswordValidate = ({ password }: { password: string }) => {
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

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Password Strength: {getPasswordStrengthLabel}</span>
        <span>{Math.round(getPasswordStrength)}%</span>
      </div>
      <Progress value={getPasswordStrength} className="h-2" />

      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(passwordRequirements).map(([key, met]) => (
          <div key={key} className="flex items-center space-x-1">
            {met ? (
              <Check className="h-3 w-3 text-success-green" />
            ) : (
              <X className="h-3 w-3 text-destructive" />
            )}
            <span
              className={met ? "text-success-green" : "text-muted-foreground"}
            >
              {key === "length" && "8+ characters"}
              {key === "uppercase" && "Uppercase letter"}
              {key === "lowercase" && "Lowercase letter"}
              {key === "number" && "Number"}
              {key === "special" && "Special character"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordValidate;
