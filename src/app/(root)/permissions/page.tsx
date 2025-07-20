import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { CreatePermission } from "@/features/permissions/components/create-permission";
import { PermissionList } from "@/features/permissions/components/permission-list";
import { PermissionDetail } from "@/features/permissions/components/permission-detail";

export default function PermissionsPage() {
  return (
    <div>
      <PageHeader
        title="Permission Management"
        subTitle="Manage permissions, roles, and their members for the HSR project"
      >
        <CreatePermission />
      </PageHeader>

      <div className="px-4 sm:px-6 py-8">
        <PermissionList />
      </div>

      <PermissionDetail />
    </div>
  );
}
