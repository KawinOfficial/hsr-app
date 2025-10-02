import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface InputFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const InputField = <T extends FieldValues>({
  register,
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  className = "",
}: InputFieldProps<T>) => {
  return (
    <FormFieldWrapper
      label={label}
      htmlFor={name}
      required={required}
      className={className}
    >
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        id={name}
      />
    </FormFieldWrapper>
  );
};
