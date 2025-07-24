import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/routers/page";

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  function onSubmit() {
    router.push(PAGE_ROUTES.DASHBOARD);
  }

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
  };
};
