import { UsersHeader } from "@/features/team-members/components/users-header";
import { UserList } from "@/features/team-members/components/user-list";
import { UserDetailDialog } from "@/features/team-members/components/user-detail-dialog";

export default function UsersPage() {
  return (
    <div>
      <UsersHeader />
      <UserList />

      <UserDetailDialog />
    </div>
  );
}
