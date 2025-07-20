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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useProfile } from "./Profile.hook";
import { getStatusColor } from "@/features/profile/utils/colorStatus";

const Profile = () => {
  const { userProfile, editMode } = useProfile();

  if (!userProfile) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Basic personal and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={userProfile.firstName}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={userProfile.lastName}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  value={userProfile.mobile}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={userProfile.nationality}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                value={userProfile.bio}
                disabled={!editMode}
              />
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
                <Input
                  id="employeeId"
                  value={userProfile.employeeId}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={userProfile.position}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={userProfile.department}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="reportingTo">Reporting To</Label>
                <Input
                  id="reportingTo"
                  value={userProfile.reportingTo}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" value={userProfile.hireDate} disabled />
              </div>
              <div>
                <Label htmlFor="workLocation">Work Location</Label>
                <Input
                  id="workLocation"
                  value={userProfile.workLocation}
                  disabled={!editMode}
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
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
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
                  <span>Emergency Contact</span>
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
