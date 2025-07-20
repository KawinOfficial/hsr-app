import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "../financial-provider/FinancialProvider";
import { Asset } from "@/features/financial/schemas/Asset.schema";

const assetsData: Asset[] = [
  {
    id: "AST-2024-001",
    name: "Track Laying Machine TLM-500",
    category: "Heavy Machinery",
    description: "Track laying machine for railway construction",
    value: 85000000,
    depreciation: 15,
    currentValue: 72250000,
    location: "Bangkok Depot",
    condition: "Excellent",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    project: "TH-CN-001",
    supplier: "Railway Equipment International",
    warrantyUntil: "2027-03-15",
  },
  {
    id: "AST-2024-002",
    name: "Concrete Mixing Plant CMP-200",
    category: "Production Equipment",
    description: "Concrete mixing plant for construction",
    value: 45000000,
    depreciation: 20,
    currentValue: 36000000,
    location: "Nakhon Ratchasima Site",
    condition: "Good",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-05-01",
    project: "TH-CN-002",
    supplier: "Construction Tech Co.",
    warrantyUntil: "2025-12-20",
  },
  {
    id: "AST-2024-003",
    name: "High-Speed Train Set HST-380",
    category: "Rolling Stock",
    description: "High-speed train set for railway transportation",
    value: 650000000,
    depreciation: 5,
    currentValue: 617500000,
    location: "Manufacturing Facility",
    condition: "New",
    lastMaintenance: "N/A",
    nextMaintenance: "2024-12-01",
    project: "TH-CN-003",
    supplier: "CRRC Corporation",
    warrantyUntil: "2034-06-30",
  },
  {
    id: "AST-2024-004",
    name: "Power Distribution System",
    category: "Electrical Infrastructure",
    description: "Power distribution system for electrical infrastructure",
    value: 120000000,
    depreciation: 10,
    currentValue: 108000000,
    location: "Multiple Stations",
    condition: "Excellent",
    lastMaintenance: "2024-01-30",
    nextMaintenance: "2024-07-30",
    project: "TH-CN-001",
    supplier: "Electrical Systems Ltd.",
    warrantyUntil: "2029-03-01",
  },
];

export const useAssets = () => {
  const handleViewItem = useContextSelector(
    FinancialContext,
    (state) => state?.handleViewItem
  );

  return { assetsData, handleViewItem };
};
