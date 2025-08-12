import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROFILE_TABS } from "@/features/profile/constants/tabs";
import { Profile } from "@/features/profile/components/profile";
import { Permission } from "@/features/profile/components/permission";
import { SecurityTab } from "@/features/profile/components/security-tab";
import { ChangePasswordDialog } from "@/features/profile/components/change-password-dialog";
import { UploadDialog } from "@/features/profile/components/upload-dialog";

export default function ProfilePage() {
  return (
    <div className="bg-background">
      <ProfileHeader />

      <div className="px-4 sm:px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            {PROFILE_TABS.map((tab, index) => (
              <TabsTrigger
                key={`${tab.value}-${index}`}
                value={tab.value}
                className="flex items-center"
              >
                {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Profile />
            <SecurityTab />
          </TabsContent>
          <TabsContent value="permissions">
            <Permission />
          </TabsContent>
        </Tabs>
      </div>

      <ChangePasswordDialog />
      <UploadDialog />
    </div>
  );
}
