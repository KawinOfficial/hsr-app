const liabilitiesData = [
  {
    id: "LIA-2024-001",
    type: "Contract Obligation",
    creditor: "Bangkok Construction Co.",
    amount: 89000000,
    dueDate: "2024-03-30",
    status: "Current",
    description: "Remaining payment for foundation work",
    project: "TH-CN-001",
    priority: "High",
    terms: "Net 45 days",
  },
  {
    id: "LIA-2024-002",
    type: "Equipment Lease",
    creditor: "Heavy Machinery Rental",
    amount: 12000000,
    dueDate: "2024-02-28",
    status: "Overdue",
    description: "Monthly lease for excavation equipment",
    project: "TH-CN-002",
    priority: "Critical",
    terms: "Monthly payment",
  },
  {
    id: "LIA-2024-003",
    type: "Advance Received",
    creditor: "Government of Thailand",
    amount: 450000000,
    dueDate: "2025-12-31",
    status: "Long-term",
    description: "Project advance funding",
    project: "TH-CN-ALL",
    priority: "Medium",
    terms: "Project completion",
  },
  {
    id: "LIA-2024-004",
    type: "Supplier Credit",
    creditor: "Steel Supply Thailand",
    amount: 34000000,
    dueDate: "2024-03-15",
    status: "Current",
    description: "Materials supplied on credit terms",
    project: "TH-CN-002",
    priority: "Medium",
    terms: "Net 30 days",
  },
];

export const useLiability = () => {
  return { liabilitiesData };
};
