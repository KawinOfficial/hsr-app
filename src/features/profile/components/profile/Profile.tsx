"use client";

import { Save, X, Edit } from "lucide-react";
import { useProfile } from "./Profile.hook";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";
import {
  PersonalInformationSection,
  WorkInformationSection,
  SystemAccessSection,
} from "../profile-sections";

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
          {/* Personal Information Section */}
          <div className="relative">
            <PersonalInformationSection
              register={form.register}
              control={form.control}
              watch={form.watch}
              editMode={editMode || false}
            />

            {/* Edit Controls */}
            <div className="absolute top-4 right-4">
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
          </div>

          {/* Work Information Section */}
          <WorkInformationSection
            register={form.register}
            control={form.control}
            editMode={editMode || false}
            departments={departments}
            roles={roles}
          />
        </div>
      </form>

      <div className="space-y-6">
        {/* System Access Section */}
        <SystemAccessSection userProfile={userProfile} />

        <Button variant="default" className="w-full" onClick={onChangePassword}>
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
