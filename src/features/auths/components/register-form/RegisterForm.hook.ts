import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auths/schemas/Register.schema";

const departments = [
  "Project Management",
  "Quality Surveying (QS)",
  "Engineering",
  "Finance",
  "Asset Management",
  "Procurement",
  "Legal",
  "Human Resources",
  "IT & Systems",
];

const positions = [
  "Project Manager",
  "Senior QS Officer",
  "QS Officer",
  "Chief Engineer",
  "Senior Engineer",
  "Engineer",
  "Finance Manager",
  "Finance Officer",
  "Procurement Manager",
  "Procurement Officer",
  "Asset Manager",
  "Site Supervisor",
  "Construction Manager",
  "Safety Officer",
  "Quality Controller",
];

const locations = [
  "Bangkok HQ",
  "Nakhon Ratchasima Site",
  "Korat Station",
  "Pak Chong Station",
  "Khon Kaen Office",
  "Beijing Office",
  "Shanghai Office",
  "Field Office - Mobile",
];

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  console.log(watch());

  function validateStep(step: number) {
    switch (step) {
      case 1:
        return (
          watch("firstName") &&
          watch("lastName") &&
          watch("email") &&
          watch("phone")
        );
      case 2:
        return watch("employeeId") && watch("department") && watch("position");
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

  async function onSubmit() {
    setIsLoading(true);
  }

  return {
    currentStep,
    isLoading,
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
