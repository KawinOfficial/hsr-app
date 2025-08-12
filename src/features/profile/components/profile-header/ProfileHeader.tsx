"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProfileHeader } from "./ProfileHeader.hook";
import { Camera, Edit, Save, X } from "lucide-react";
import { getStatusColor } from "@/features/profile/utils/colorStatus";

const ProfileHeader = () => {
  const { userProfile, setProfileImageOpen } = useProfileHeader();

  if (!userProfile) return null;

  return (
    <div className="border-b bg-card">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={""} />
              <AvatarFallback className="text-lg">
                {userProfile?.firstName?.charAt(0)}
                {userProfile?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <Badge className={getStatusColor(userProfile?.status || "")}>
                  {userProfile?.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {userProfile.employeeInfo?.position} •{" "}
                {userProfile.employeeInfo?.department}
              </p>
              <div className="flex items-center space-x-2 mt-1"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setProfileImageOpen?.(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
