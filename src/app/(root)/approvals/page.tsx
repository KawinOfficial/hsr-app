import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { ApproveDialog } from "@/features/approvals/components/approve-dialog";
import ApprovalList from "@/features/approvals/components/approval-list/ApprovalList";
import { InReviewDialog } from "@/features/approvals/components/in-review-dialog";
import { RejectDialog } from "@/features/approvals/components/reject-dialog";

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

      <ApproveDialog />
      <RejectDialog />
      <InReviewDialog />
    </div>
  );
}
