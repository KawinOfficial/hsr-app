import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { PAGE_ROUTES } from "@/routers/page";
import {
  loginSchema,
  forgotPasswordSchema,
  LoginFormData,
  ForgotPasswordFormData,
} from "@/features/auths/schemas/Login.schema";
import { useMessageDialog } from "@/components/dialog/message-dialog";

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotPasswordErrors },
    reset: resetForgotPassword,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push(PAGE_ROUTES.DASHBOARD);
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function onForgotPasswordSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    setError(null);

    // TODO: Implement password reset functionality
    alert("Password reset functionality will be implemented soon.");
    setForgotPassword(false);
    resetForgotPassword();
  }

  return {
    showPassword,
    setShowPassword,
    register,
    registerForgotPassword,
    forgotPassword,
    setForgotPassword,
    isLoading,
    error,
    errors,
    forgotPasswordErrors,
    reset,
    onSubmit: handleSubmit(onSubmit),
    onForgotPasswordSubmit: handleSubmitForgotPassword(onForgotPasswordSubmit),
  };
};
