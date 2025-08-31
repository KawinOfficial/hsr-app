import { ApprovalProvider } from "@/features/approvals/components/approval-provider";

export default function ApprovalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApprovalProvider>{children}</ApprovalProvider>;
}
