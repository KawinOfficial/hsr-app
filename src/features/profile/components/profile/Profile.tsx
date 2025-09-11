"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, X, Edit, MapPin } from "lucide-react";
import { useProfile } from "./Profile.hook";
import { getStatusColor } from "@/features/profile/utils/colorStatus";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { locations, nationalities } from "@/constants/options";
import { Loading } from "@/components/loading";

const Profile = () => {
  const {
    userProfile,
    editMode,
    setEditMode,
    form,
    isFetching,
    onCancel,
    onSubmit,
    departments,
    roles,
    onChangePassword,
  } = useProfile();

  if (!userProfile) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isFetching && <Loading />}
      <form onSubmit={onSubmit} className="w-full lg:col-span-2">
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Basic personal and contact information
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  {!editMode ? (
                    <Button
                      size="sm"
                      onClick={() => setEditMode?.(!editMode)}
                      variant="outline"
                      type="button"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={onCancel}
                        variant="destructive"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline" type="submit">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input {...form.fieldFirstName} disabled={!editMode} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input {...form.fieldLastName} disabled={!editMode} />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    {...form.fieldEmail}
                    type="email"
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input {...form.fieldPhoneNumber} disabled={!editMode} />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Controller
                    control={form.control}
                    name="nationality"
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
                {form.watch("nationality") === "Other" && (
                  <div>
                    <Label htmlFor="otherNationality">Other Nationality</Label>
                    <Input
                      id="otherNationality"
                      placeholder="Other nationality"
                      disabled={!editMode}
                      {...form.fieldOtherNationality}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
              <CardDescription>
                Employment details and organizational information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input {...form.fieldEmployeeId} disabled />
                </div>
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Controller
                    control={form.control}
                    name="employeeInfo.roleId"
                    disabled={!editMode}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
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
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Controller
                    control={form.control}
                    name="employeeInfo.departmentId"
                    disabled={!editMode}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department.value}
                              value={department.value}
                            >
                              {department.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="reportingTo">Reporting To</Label>
                  <Input {...form.fieldManagerName} disabled={!editMode} />
                </div>
              </div>
              <div>
                <Label htmlFor="workLocation">Work Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Controller
                    control={form.control}
                    name="employeeInfo.workLocation"
                    disabled={!editMode}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
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
            </CardContent>
          </Card>
        </div>
      </form>

      <div className="space-y-6">
        {/* System Access */}
        <Card>
          <CardHeader>
            <CardTitle>System Access</CardTitle>
            <CardDescription>
              System modules and features access permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProfile?.permissions &&
                Object.entries(userProfile?.permissions).map(
                  ([module, accessList], index) => (
                    <div
                      key={`${module}-${index}`}
                      className="flex items-center justify-between space-x-2"
                    >
                      <span className="capitalize">{module}</span>
                      <div className="flex items-center gap-2">
                        {Object.entries(accessList).map(
                          ([access, hasAccess], subIndex) => (
                            <Badge
                              key={`${access}-${hasAccess}-${index}-${subIndex}`}
                              className={getStatusColor(
                                hasAccess ? "Active" : "Inactive"
                              )}
                            >
                              {access}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Card>

        <Button variant="default" className="w-full" onClick={onChangePassword}>
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
