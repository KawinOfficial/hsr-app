import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "@/features/profile/components/profile-provider";
import { useState, useEffect } from "react";
import { Password } from "@/features/profile/schemas/Password.schema";
import { useForm } from "react-hook-form";
import { usePassword } from "@/features/profile/hooks/use-password";
import { useToast } from "@/components/ui/use-toast";

const passwordRequirements = [
  {
    id: "length",
    regex: /.{8,}/,
    message: "Password must be at least 8 characters long",
  },
  {
    id: "uppercase",
    regex: /[A-Z]/,
    message: "Password must contain at least one uppercase letter",
  },
  {
    id: "lowercase",
    regex: /[a-z]/,
    message: "Password must contain at least one lowercase letter",
  },
  {
    id: "number",
    regex: /\d/,
    message: "Password must contain at least one number",
  },
  {
    id: "special",
    regex: /[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/,
    message: "Password must contain at least one special character",
  },
];

const defaultValues: Password = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const useChangePasswordDialog = () => {
  const { toast } = useToast();
  const changePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.changePasswordOpen
  );
  const setChangePasswordOpen = useContextSelector(
    ProfileContext,
    (state) => state?.setChangePasswordOpen
  );

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordValidation, setPasswordValidation] = useState(
    passwordRequirements.map((req) => ({
      id: req.id,
      message: req.message,
      isValid: false,
    }))
  );
  const { mutate, isPending } = usePassword();

  const methods = useForm<Password>({
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, reset, register, clearErrors, watch } = methods;
  const newPasswordValue = watch("newPassword");

  const form = {
    fieldCurrentPassword: register("currentPassword", {
      required: "Current password is required",
    }),
    fieldNewPassword: register("newPassword", {
      required: "New password is required",
      validate: (value) => {
        for (const req of passwordRequirements) {
          if (!req.regex.test(value)) {
            return req.message;
          }
        }
        return true;
      },
    }),
    fieldConfirmPassword: register("confirmPassword", {
      required: "Please confirm your new password",
      validate: (value) => {
        if (value !== methods.getValues("newPassword")) {
          return "Passwords do not match";
        }
        return true;
      },
    }),
  };

  function toggleShowPassword(password: string) {
    setShowPassword((prev) => ({
      ...prev,
      [password]: !prev[password as keyof typeof prev],
    }));
  }

  function onSubmit(data: Password) {
    mutate(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Password Updated",
          description: "Your password has been updated successfully.",
        });
        onReset();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Password update failed";
        toast({
          variant: "destructive",
          title: "Password Update Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    setChangePasswordOpen?.(false);
    clearErrors();
    setPasswordValidation(
      passwordRequirements.map((req) => ({
        id: req.id,
        message: req.message,
        isValid: false,
      }))
    );
  }

  useEffect(() => {
    if (newPasswordValue) {
      const updatedValidation = passwordRequirements.map((req) => ({
        id: req.id,
        message: req.message,
        isValid: req.regex.test(newPasswordValue),
      }));
      setPasswordValidation(updatedValidation);
    } else {
      setPasswordValidation(
        passwordRequirements.map((req) => ({
          id: req.id,
          message: req.message,
          isValid: false,
        }))
      );
    }
  }, [newPasswordValue]);

  return {
    changePasswordOpen,
    setChangePasswordOpen,
    showPassword,
    toggleShowPassword,
    methods,
    onSubmit: handleSubmit(onSubmit),
    onReset,
    form,
    passwordValidation,
    isPending,
  };
};
