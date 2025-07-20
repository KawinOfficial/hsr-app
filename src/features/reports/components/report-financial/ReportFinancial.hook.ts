const financialMetrics = {
  totalRevenue: 2850000000,
  totalExpenses: 1420000000,
  netIncome: 1430000000,
  monthlyBurn: 78000000,
  cashFlow: 156000000,
  budgetVariance: -2.5,
  profitMargin: 50.2,
  roi: 18.5,
};

const monthlyData = [
  {
    month: "Jan 2024",
    revenue: 245000000,
    expenses: 128000000,
    profit: 117000000,
  },
  {
    month: "Feb 2024",
    revenue: 278000000,
    expenses: 142000000,
    profit: 136000000,
  },
  {
    month: "Mar 2024",
    revenue: 312000000,
    expenses: 165000000,
    profit: 147000000,
  },
  {
    month: "Apr 2024",
    revenue: 289000000,
    expenses: 158000000,
    profit: 131000000,
  },
  {
    month: "May 2024",
    revenue: 325000000,
    expenses: 172000000,
    profit: 153000000,
  },
  {
    month: "Jun 2024",
    revenue: 298000000,
    expenses: 149000000,
    profit: 149000000,
  },
];

const breakdownData = [
  {
    category: "Government Funding",
    amount: 1800000000,
    percentage: "63.2%",
  },
  {
    category: "Chinese Investment",
    amount: 850000000,
    percentage: "29.8%",
  },
  {
    category: "Other Revenue",
    amount: 200000000,
    percentage: "7.0%",
  },
];

export const useReportFinancial = () => {
  return { monthlyData, financialMetrics, breakdownData };
};
