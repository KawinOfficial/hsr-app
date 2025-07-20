"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Camera, Save } from "lucide-react";
import { useUploadDialog } from "./UploadDialog.hook";

const UploadDialog = () => {
  const { profileImageOpen, setProfileImageOpen, userProfile } =
    useUploadDialog();

  return (
    <Dialog open={profileImageOpen} onOpenChange={setProfileImageOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
          <DialogDescription>
            Upload a new profile photo or choose from avatars
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile?.profileImage} />
              <AvatarFallback className="text-2xl">
                {userProfile?.firstName.charAt(0)}
                {userProfile?.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setProfileImageOpen?.(false)}
          >
            Cancel
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
