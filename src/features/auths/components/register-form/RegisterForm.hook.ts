import { useState } from "react";
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

const stepTitles = [
  "Personal Information",
  "Work Information",
  "Account Security",
  "Terms & Agreement",
];

const defaultFormData = {
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
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultFormData,
  });

  function validateStep(step: number) {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return formData.employeeId && formData.department && formData.position;
      case 3:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 4:
        return (
          formData.agreeTerms && formData.agreePrivacy && formData.agreeCode
        );
      default:
        return false;
    }
  }

  function nextStep() {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setError("");
    } else {
      setError(
        "Please fill in all required fields correctly before proceeding."
      );
    }
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError("");
  }

  async function onSubmit() {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to login on successful registration
      window.location.href = "/login?registered=true";
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    currentStep,
    isLoading,
    error,
    departments,
    positions,
    locations,
    validateStep,
    nextStep,
    prevStep,
    stepTitles,
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
