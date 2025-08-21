import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserList } from "@/features/team-members/components/user-list";
import { UserDetailDialog } from "@/features/team-members/components/user-detail-dialog";

const Team = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Team</CardTitle>
            <CardDescription>
              Team members assigned to this project
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <UserList className="m-0" />
      </CardContent>

      <UserDetailDialog />
    </Card>
  );
};

export default Team;
