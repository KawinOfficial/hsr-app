"use client";

import { useRegisterForm } from "./RegisterForm.hook";
import { AlertTriangle, CheckCircle, Train } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PAGE_ROUTES } from "@/routers/page";
import { FormProvider } from "react-hook-form";
import { PersonalForm } from "@/features/auths/components/personal-form";
import { WorkForm } from "@/features/auths/components/work-form";
import { SecurityForm } from "@/features/auths/components/security-form";
import { TermsAgreements } from "@/features/auths/components/terms-agreements";

const RegisterForm = () => {
  const {
    currentStep,
    isLoading,
    errors,
    departments,
    positions,
    locations,
    validateStep,
    nextStep,
    prevStep,
    onSubmit,
    header,
    methods,
    stepHeaders,
  } = useRegisterForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side - Progress and Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Train className="h-8 w-8 text-rail-blue" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Thai-Chinese HSR
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Cost Control System
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Create Your Account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Join the HSR project team and get access to the integrated
                  management platform.
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{currentStep} of 4</span>
              </div>
              <Progress value={(currentStep / 4) * 100} className="h-2" />

              <div className="space-y-3">
                {stepHeaders.map(({ title }, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 text-sm ${
                      currentStep > index + 1
                        ? "text-success-green"
                        : currentStep === index + 1
                        ? "text-rail-blue font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep > index + 1
                          ? "bg-success-green text-white"
                          : currentStep === index + 1
                          ? "bg-rail-blue text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > index + 1 ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Step {currentStep}: {header.title}
                </CardTitle>
                <CardDescription>{header.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {errors &&
                  Object.keys(errors).length > 0 &&
                  Object.keys(errors).map((key) => (
                    <Alert key={key} variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {errors[key as keyof typeof errors]?.message}
                      </AlertDescription>
                    </Alert>
                  ))}

                {currentStep === 1 && <PersonalForm />}
                {currentStep === 2 && (
                  <WorkForm
                    departments={departments}
                    positions={positions}
                    locations={locations}
                  />
                )}
                {currentStep === 3 && <SecurityForm />}
                {currentStep === 4 && <TermsAgreements />}

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  {currentStep === 4 ? (
                    <Button
                      type="submit"
                      disabled={!validateStep(currentStep) || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href={PAGE_ROUTES.LOGIN}
                  className="text-rail-blue hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
