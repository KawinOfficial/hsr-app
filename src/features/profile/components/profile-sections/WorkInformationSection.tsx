import { Control, UseFormRegister, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField, SelectField } from "../form-fields";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { locations } from "@/constants/options";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkInformationSectionProps {
  register: UseFormRegister<Profile>;
  control: Control<Profile>;
  editMode: boolean;
  departments: Array<{ value: string; label: string }>;
  roles: Array<{ value: string; label: string }>;
}

export const WorkInformationSection = ({
  register,
  control,
  editMode,
  departments,
  roles,
}: WorkInformationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Information</CardTitle>
        <CardDescription>
          Employment details and organizational information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <InputField
            register={register}
            name="employeeInfo.employeeId"
            label="Employee ID"
            disabled
          />
          <SelectField
            control={control}
            name="employeeInfo.roleId"
            label="Position"
            placeholder="Select position"
            options={roles}
            disabled={!editMode}
            required
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <SelectField
            control={control}
            name="employeeInfo.departmentId"
            label="Department"
            placeholder="Select department"
            options={departments}
            disabled={!editMode}
            required
          />
          <InputField
            register={register}
            name="employeeInfo.managerName"
            label="Reporting To"
            disabled={!editMode}
          />
        </div>

        <div>
          <label
            htmlFor="workLocation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Work Location
          </label>
          <div className="relative mt-2">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              control={control}
              name="employeeInfo.workLocation"
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    if (!value) return;
                    field.onChange(value);
                  }}
                  value={field.value}
                  disabled={!editMode}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select work location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
