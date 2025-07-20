const costAnalysisData = [
  {
    category: "Labor Costs",
    budgeted: 450000000,
    actual: 425000000,
    variance: -5.6,
    forecast: 430000000,
    trend: "down",
  },
  {
    category: "Materials",
    budgeted: 850000000,
    actual: 892000000,
    variance: 4.9,
    forecast: 920000000,
    trend: "up",
  },
  {
    category: "Equipment",
    budgeted: 320000000,
    actual: 298000000,
    variance: -6.9,
    forecast: 305000000,
    trend: "down",
  },
  {
    category: "Subcontractors",
    budgeted: 680000000,
    actual: 712000000,
    variance: 4.7,
    forecast: 735000000,
    trend: "up",
  },
  {
    category: "Overhead",
    budgeted: 125000000,
    actual: 118000000,
    variance: -5.6,
    forecast: 120000000,
    trend: "down",
  },
];

export const useCostAnalysis = () => {
  return { costAnalysisData };
};
