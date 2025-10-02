import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/features/auths/schemas/Profile.schema";
import { getStatusColor } from "../../utils/colorStatus";

interface SystemAccessSectionProps {
  userProfile: Profile;
}

export const SystemAccessSection = ({
  userProfile,
}: SystemAccessSectionProps) => {
  if (!userProfile?.permissions) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Access</CardTitle>
        <CardDescription>
          System modules and features access permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(userProfile.permissions).map(
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
  );
};
