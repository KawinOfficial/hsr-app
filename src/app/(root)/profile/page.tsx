import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Profile } from "@/features/profile/components/profile";
import { ChangePasswordDialog } from "@/features/profile/components/change-password-dialog";
import { UploadDialog } from "@/features/profile/components/upload-dialog";

export default function ProfilePage() {
  return (
    <div className="bg-background">
      <ProfileHeader />

      <div className="px-4 sm:px-6 py-8">
        <Profile />
      </div>

      <ChangePasswordDialog />
      <UploadDialog />
    </div>
  );
}
