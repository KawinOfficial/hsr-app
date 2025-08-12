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
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertTriangle,
  Save,
  X,
  Edit,
  MapPin,
} from "lucide-react";
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
import {
  departments,
  locations,
  nationalities,
  positions,
} from "@/constants/options";
import { Loading } from "@/components/loading";

const Profile = () => {
  const {
    userProfile,
    editMode,
    setEditMode,
    handleSaveProfile,
    form,
    isFetching,
  } = useProfile();

  if (!userProfile) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isFetching && <Loading />}

      {/* Personal Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Basic personal and contact information
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setEditMode?.(!editMode)}
                  variant={editMode ? "destructive" : "default"}
                >
                  {editMode ? (
                    <>
                      <X className="h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
                {editMode && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveProfile}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input {...form.fieldFirstName} disabled={!editMode} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input {...form.fieldLastName} disabled={!editMode} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input {...form.fieldEmail} type="email" disabled={!editMode} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input {...form.fieldPhoneNumber} disabled={!editMode} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Controller
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input {...form.fieldEmployeeId} disabled />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Controller
                  control={form.control}
                  name="employeeInfo.position"
                  disabled={!editMode}
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
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Controller
                  control={form.control}
                  name="employeeInfo.department"
                  disabled={!editMode}
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
                          <SelectItem key={dept} value={dept}>
                            {dept}
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
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Information */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Profile Completeness</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success-green" />
                  <span>Personal Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success-green" />
                  <span>Work Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success-green" />
                  <span>Security Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-warning-amber" />
                  <span>Certifications</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Professional certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userProfile.certifications.map((cert, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{cert.name}</h4>
                      <Badge
                        className={getStatusColor(cert.status)}
                        variant="secondary"
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {cert.expiryDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
