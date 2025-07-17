import { DollarSign, FileText, Target, TrendingUp } from "lucide-react";

export const useKeyMetrics = () => {
  const keyMetrics = [
    {
      title: "Total Project Budget",
      value: "฿2.85B",
      change: "+2.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-rail-blue",
    },
    {
      title: "Current Expenditure",
      value: "฿1.42B",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-construction-orange",
    },
    {
      title: "Cost Variance",
      value: "-3.2%",
      change: "Improved",
      trend: "down",
      icon: Target,
      color: "text-success-green",
    },
    {
      title: "Active Contracts",
      value: "127",
      change: "+8",
      trend: "up",
      icon: FileText,
      color: "text-rail-gold",
    },
  ];

  return {
    keyMetrics,
  };
};
