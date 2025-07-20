import { FinancialContext } from "../financial-provider/FinancialProvider";
import { useContextSelector } from "use-context-selector";

const paymentsData = [
  {
    id: "PAY-2024-001",
    type: "Contractor Payment",
    vendor: "Bangkok Construction Co.",
    amount: 45000000,
    status: "Processed",
    date: "2024-02-15",
    description: "Foundation work - Section A12-A15",
    project: "TH-CN-001",
    approvedBy: "Somchai Tanakorn",
    paymentMethod: "Bank Transfer",
    reference: "BT-240215-001",
  },
  {
    id: "PAY-2024-002",
    type: "Advance Payment",
    vendor: "Steel Supply Thailand",
    amount: 25000000,
    status: "Pending Approval",
    date: "2024-02-16",
    description: "Steel materials advance payment",
    project: "TH-CN-002",
    approvedBy: "Pending",
    paymentMethod: "Bank Transfer",
    reference: "ADV-240216-002",
  },
  {
    id: "PAY-2024-003",
    type: "Miscellaneous",
    vendor: "Safety Equipment Ltd.",
    amount: 3500000,
    status: "Approved",
    date: "2024-02-14",
    description: "Safety equipment and PPE",
    project: "TH-CN-001",
    approvedBy: "Pranee Chotirat",
    paymentMethod: "Corporate Card",
    reference: "CC-240214-003",
  },
  {
    id: "PAY-2024-004",
    type: "Contractor Payment",
    vendor: "China Railway Engineering",
    amount: 125000000,
    status: "In Progress",
    date: "2024-02-17",
    description: "Track installation milestone payment",
    project: "TH-CN-001",
    approvedBy: "Liu Wei Chen",
    paymentMethod: "Wire Transfer",
    reference: "WT-240217-004",
  },
];

export const usePayments = () => {
  const handleViewItem = useContextSelector(
    FinancialContext,
    (state) => state?.handleViewItem
  );
  const handleCreateDocument = useContextSelector(
    FinancialContext,
    (state) => state?.handleCreateDocument
  );

  return { paymentsData, handleViewItem, handleCreateDocument };
};
