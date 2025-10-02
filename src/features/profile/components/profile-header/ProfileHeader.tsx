"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useProfileHeader } from "./ProfileHeader.hook";
import { getStatusColor } from "@/features/profile/utils/colorStatus";
import { memo } from "react";

const ProfileHeader = memo(() => {
  const { userProfile, role, department } = useProfileHeader();

  if (!userProfile) return null;

  const fullName = `${userProfile.firstName} ${userProfile.lastName}`;
  const initials = `${userProfile.firstName?.charAt(0) || ""}${
    userProfile.lastName?.charAt(0) || ""
  }`;
  const statusColor = getStatusColor(userProfile?.status || "");

  return (
    <header className="border-b bg-card" role="banner">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={`${fullName}'s profile picture`} />
              <AvatarFallback className="text-lg" aria-hidden="true">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {fullName}
                </h1>
                <Badge
                  className={statusColor}
                  aria-label={`Status: ${userProfile?.status}`}
                >
                  {userProfile?.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {role} • {department}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;
