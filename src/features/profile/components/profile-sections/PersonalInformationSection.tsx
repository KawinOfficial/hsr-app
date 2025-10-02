import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField, SelectField } from "../form-fields";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { nationalities } from "@/constants/options";

interface PersonalInformationSectionProps {
  register: UseFormRegister<Profile>;
  control: Control<Profile>;
  watch: UseFormWatch<Profile>;
  editMode: boolean;
}

export const PersonalInformationSection = ({
  register,
  control,
  watch,
  editMode,
}: PersonalInformationSectionProps) => {
  const nationality = watch("nationality");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Basic personal and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <InputField
            register={register}
            name="firstName"
            label="First Name"
            disabled={!editMode}
          />
          <InputField
            register={register}
            name="lastName"
            label="Last Name"
            disabled={!editMode}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <InputField
            register={register}
            name="email"
            label="Email Address"
            type="email"
            disabled={!editMode}
          />
          <InputField
            register={register}
            name="phoneNumber"
            label="Phone Number"
            disabled={!editMode}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <SelectField
            control={control}
            name="nationality"
            label="Nationality"
            placeholder="Select nationality"
            options={nationalities.map((nat) => ({ value: nat, label: nat }))}
            disabled={!editMode}
          />
          {nationality === "Other" && (
            <InputField
              register={register}
              name="otherNationality"
              label="Other Nationality"
              placeholder="Other nationality"
              disabled={!editMode}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
