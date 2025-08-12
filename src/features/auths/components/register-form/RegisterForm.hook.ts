import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auths/schemas/Register.schema";
import { useToast } from "@/hooks/use-toast";
import { useRegister } from "@/features/auths/hook/use-register";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/routers/page";
import { departments, positions, locations } from "@/constants/options";

const stepHeaders = [
  {
    title: "Personal Information",
    description: "Please provide your personal contact information",
  },
  {
    title: "Work Information",
    description: "Enter your employment and work-related details",
  },
  {
    title: "Account Security",
    description: "Set up your account password and security",
  },
  {
    title: "Terms & Agreement",
    description: "Review and accept the terms and conditions",
  },
];

const defaultValues = {
  // Step 1 - Personal Information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",

  // Step 2 - Work Information
  employeeId: "",
  department: "",
  position: "",
  reportingTo: "",
  workLocation: "",

  // Step 3 - Account Security
  password: "",
  confirmPassword: "",

  // Step 4 - Agreement
  agreeTerms: false,
  agreePrivacy: false,
  agreeCode: false,
};

export const useRegisterForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const { mutate: mutateRegister, isPending } = useRegister();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });
  const {
    watch,
    formState: { errors },
  } = methods;

  const header = useMemo(() => {
    return {
      title: stepHeaders[currentStep - 1].title,
      description: stepHeaders[currentStep - 1].description,
    };
  }, [currentStep]);

  function validateStep(step: number) {
    switch (step) {
      case 1:
        return (
          watch("firstName") &&
          watch("lastName") &&
          watch("email") &&
          watch("phone") &&
          watch("nationality")
        );
      case 2:
        return (
          watch("employeeId") &&
          watch("department") &&
          watch("position") &&
          watch("reportingTo") &&
          watch("workLocation")
        );
      case 3:
        return (
          watch("password") &&
          watch("confirmPassword") &&
          watch("password") === watch("confirmPassword")
        );
      case 4:
        return (
          watch("agreeTerms") && watch("agreePrivacy") && watch("agreeCode")
        );
      default:
        return false;
    }
  }

  function nextStep() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  function onSubmit(data: RegisterFormData) {
    mutateRegister(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Registration Successful!",
          description:
            "Your account has been created successfully. You can now sign in.",
        });
        router.push(PAGE_ROUTES.LOGIN);
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorMessage,
        });
      },
    });
  }

  return {
    currentStep,
    isLoading: isPending,
    departments,
    positions,
    locations,
    validateStep,
    nextStep,
    prevStep,
    header,
    stepHeaders,
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    errors,
  };
};
