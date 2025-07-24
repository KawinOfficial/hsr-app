"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSecurityForm } from "./SecurityForm.hook";

const SecurityForm = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrength,
    getPasswordStrengthLabel,
    passwordRequirements,
  } = useSecurityForm();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* {formData.password && ( */}
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Password Strength: {getPasswordStrengthLabel()}</span>
            <span>{Math.round(getPasswordStrength())}%</span>
          </div>
          <Progress value={getPasswordStrength()} className="h-2" />

          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(passwordRequirements).map(([key, met]) => (
              <div key={key} className="flex items-center space-x-1">
                {met ? (
                  <Check className="h-3 w-3 text-success-green" />
                ) : (
                  <X className="h-3 w-3 text-destructive" />
                )}
                <span
                  className={
                    met ? "text-success-green" : "text-muted-foreground"
                  }
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
        {/* )} */}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {/* {formData.confirmPassword &&
          formData.password !== formData.confirmPassword && (
            <p className="text-sm text-destructive mt-1">
              Passwords do not match
            </p>
          )} */}
      </div>
    </div>
  );
};

export default SecurityForm;
