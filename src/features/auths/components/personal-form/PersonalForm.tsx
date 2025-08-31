"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nationalities } from "@/constants/options";

const PersonalForm = () => {
  const { register, control, watch } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="First name"
            required
            {...register("firstName")}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Last name"
            required
            {...register("lastName")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            className="pl-10"
            required
            {...register("email")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            className="pl-10"
            required
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nationality">Nationality</Label>
        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {watch("nationality") === "Other" && (
        <div>
          <Label htmlFor="otherNationality">Other Nationality</Label>
          <Input
            id="otherNationality"
            placeholder="Other nationality"
            {...register("otherNationality")}
          />
        </div>
      )}
    </div>
  );
};

export default PersonalForm;
