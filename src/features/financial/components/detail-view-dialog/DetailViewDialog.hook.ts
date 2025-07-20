import { useMemo } from "react";
import { FinancialContext } from "../financial-provider/FinancialProvider";
import { useContextSelector } from "use-context-selector";
import { EnhancedDetails } from "@/features/financial/schemas/Detail.schema";

export const useDetailViewDialog = () => {
  const isOpen = useContextSelector(FinancialContext, (state) => state?.isOpen);
  const selectedItem = useContextSelector(
    FinancialContext,
    (state) => state?.selectedItem
  );
  const setIsOpen = useContextSelector(
    FinancialContext,
    (state) => state?.setIsOpen
  );
  const editMode = useContextSelector(
    FinancialContext,
    (state) => state?.editMode
  );
  const handleEdit = useContextSelector(
    FinancialContext,
    (state) => state?.handleEdit
  );
  const handleCancel = useContextSelector(
    FinancialContext,
    (state) => state?.handleCancel
  );
  const handleSave = useContextSelector(
    FinancialContext,
    (state) => state?.handleSave
  );
  const handleClose = useContextSelector(
    FinancialContext,
    (state) => state?.handleClose
  );

  const { item, type } = selectedItem || {};

  const getEnhancedDetails = (): EnhancedDetails => {
    const baseDetails = {
      approvalHistory: [
        {
          date: "2024-02-15 09:30",
          action: "Created",
          user: "Siriporn Wattana",
          role: "Finance Manager",
          comment: "Initial request created",
        },
        {
          date: "2024-02-15 14:20",
          action: "Reviewed",
          user: "Somchai Tanakorn",
          role: "Project Manager",
          comment: "Reviewed and approved",
        },
        {
          date: "2024-02-16 10:15",
          action: "Processed",
          user: "Malee Jitpakdee",
          role: "Accounts Payable",
          comment: "Payment processed via bank transfer",
        },
      ],
      attachments: [
        {
          name: "Invoice_001.pdf",
          size: "245 KB",
          uploadDate: "2024-02-15",
          type: "Invoice",
        },
        {
          name: "Purchase_Order.pdf",
          size: "128 KB",
          uploadDate: "2024-02-14",
          type: "Purchase Order",
        },
      ],
    };

    if (type === "payment" && item) {
      return {
        ...baseDetails,
        bankDetails: {
          bankName: "Bangkok Bank",
          accountNumber: "****-****-**1234",
          swiftCode: "BKKBTHBK",
          beneficiary: item.vendor,
        },
        taxInfo: {
          vatRate: 7,
          vatAmount: item.amount * 0.07,
          withholdingTax: item.amount * 0.03,
          netAmount: item.amount - item.amount * 0.03,
        },
      };
    } else if (type === "asset" && item) {
      return {
        ...baseDetails,
        maintenanceHistory: [
          {
            date: "2024-01-15",
            type: "Scheduled Maintenance",
            description: "Routine inspection and lubrication",
            cost: 50000,
            technician: "Anupong Thavorn",
          },
          {
            date: "2023-12-01",
            type: "Repair",
            description: "Hydraulic system repair",
            cost: 125000,
            technician: "Workshop Team",
          },
        ],
        specifications: {
          manufacturer: item.supplier || "Unknown",
          model: "TLM-500-HD",
          serialNumber: "TLM-2024-001",
          capacity: "500 tons",
          powerRating: "2000 kW",
        },
        insurance: {
          provider: "Thai Insurance Group",
          policyNumber: "TIG-2024-HSR-001",
          coverage: 90000000,
          expiryDate: "2025-03-15",
        },
      };
    } else if (type === "liability" && item) {
      return {
        ...baseDetails,
        paymentSchedule: [
          {
            date: "2024-03-15",
            amount: item.amount * 0.3,
            status: "Upcoming",
            description: "First installment",
          },
          {
            date: "2024-06-15",
            amount: item.amount * 0.4,
            status: "Scheduled",
            description: "Second installment",
          },
          {
            date: "2024-09-15",
            amount: item.amount * 0.3,
            status: "Scheduled",
            description: "Final installment",
          },
        ],
        contractTerms: {
          interestRate: "3.5% per annum",
          penaltyRate: "1.5% per month for late payment",
          gracePeriod: "30 days",
          collateral: "Project assets as security",
        },
      };
    }

    return baseDetails;
  };

  const enhancedDetails = getEnhancedDetails();

  const typeTitle = useMemo(() => {
    switch (type) {
      case "payment":
        return "Payment Details";
      case "asset":
        return "Asset Details";
      case "liability":
        return "Liability Details";
      default:
        return "Financial Item Details";
    }
  }, [type]);

  return {
    isOpen,
    selectedItem,
    setIsOpen,
    editMode,
    handleEdit,
    handleCancel,
    handleSave,
    handleClose,
    typeTitle,
    enhancedDetails,
  };
};
