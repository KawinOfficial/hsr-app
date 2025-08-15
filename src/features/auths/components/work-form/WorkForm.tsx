"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseOption } from "@/features/profile/schemas/Option.schema";
import { RegisterFormData } from "@/features/auths/schemas/Register.schema";

interface WorkFormProps {
  departments: BaseOption[];
  roles: BaseOption[];
  locations: string[];
}

const WorkForm = ({ departments, roles, locations }: WorkFormProps) => {
  const { register, control } = useFormContext<RegisterFormData>();
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="employeeId">Employee ID *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="employeeId"
            placeholder="EMP-2024-001"
            className="pl-10"
            required
            {...register("employeeId")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department *</Label>
          <Controller
            control={control}
            name="departmentId"
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="position">Position *</Label>
          <Controller
            control={control}
            name="roleId"
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reportingTo">Reporting To</Label>
        <Input
          id="reportingTo"
          placeholder="Manager's name"
          {...register("reportingTo")}
        />
      </div>

      <div>
        <Label htmlFor="workLocation">Work Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Controller
            control={control}
            name="workLocation"
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value}
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
    </div>
  );
};

export default WorkForm;
