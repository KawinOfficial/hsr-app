import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled = false,
  required = false,
  className = "",
}: SelectFieldProps<T>) => {
  return (
    <FormFieldWrapper label={label} required={required} className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            onValueChange={(value) => {
              if (!value) return;
              field.onChange(value);
            }}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormFieldWrapper>
  );
};
