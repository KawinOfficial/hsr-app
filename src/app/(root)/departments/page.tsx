import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { CreateDepartments } from "@/features/departments/components/create-department";
import { DepartmentList } from "@/features/departments/components/department-list";
import { DepartmentDetailDialog } from "@/features/departments/components/department-detail-dialog";
import { MemberListDialog } from "@/features/departments/components/member-list-dialog";

export default function DepartmentsPage() {
  return (
    <div>
      <PageHeader
        title="Department Management"
        subTitle="Manage departments, teams, and their members for the HSR project"
      >
        <CreateDepartments />
      </PageHeader>

      <div className="px-4 sm:px-6 py-8">
        <DepartmentList />
      </div>

      <DepartmentDetailDialog />
      <MemberListDialog />
    </div>
  );
}
