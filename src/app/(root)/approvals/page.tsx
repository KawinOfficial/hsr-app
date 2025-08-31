import PageHeader from "@/components/layout/page-haeder/PageHeader";
import ApprovalList from "@/features/approvals/components/approval-list/ApprovalList";

export default function ApprovalsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Documents Requiring Your Approval"
        subTitle="Review and approve documents assigned to you"
      />

      <div className="p-4 sm:p-6">
        <ApprovalList />
      </div>
    </div>
  );
}
