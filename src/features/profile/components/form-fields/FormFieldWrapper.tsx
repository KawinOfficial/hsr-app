import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldWrapperProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormFieldWrapper = ({
  label,
  htmlFor,
  required = false,
  children,
  className = "",
}: FormFieldWrapperProps) => {
  return (
    <div className={className}>
      <Label
        htmlFor={htmlFor}
        className={
          required
            ? "after:content-['*'] after:ml-0.5 after:text-destructive"
            : ""
        }
      >
        {label}
      </Label>
      {children}
    </div>
  );
};
