export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    url: "/",
    iconName: "Home",
  },
  {
    title: "Project Management",
    iconName: "Building2",
    items: [
      {
        title: "Bidding & Budget",
        url: "/project-management",
        description: "Manage bidding and budget planning",
      },
      {
        title: "Project Overview",
        url: "/projects",
        description: "View all active projects",
      },
      {
        title: "Milestones",
        url: "/milestones",
        description: "Track project milestones and deliverables",
      },
    ],
  },
  {
    title: "Financial Management",
    iconName: "DollarSign",
    items: [
      {
        title: "Payments & Advances",
        url: "/payments",
        description: "Process payments and advance requests",
      },
      {
        title: "Asset Management",
        url: "/assets",
        description: "Register and manage project assets",
      },
      {
        title: "Liabilities",
        url: "/liabilities",
        description: "Track project liabilities and obligations",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    iconName: "BarChart3",
    items: [
      {
        title: "Financial Reports",
        url: "/reports/financial",
        description: "Income and expense reports",
      },
      {
        title: "Project Summary",
        url: "/reports/summary",
        description: "Comprehensive project reports",
      },
      {
        title: "Cost Analysis",
        url: "/reports/cost-analysis",
        description: "Detailed cost analysis and forecasting",
      },
    ],
  },
  {
    title: "User Management",
    iconName: "Users",
    items: [
      {
        title: "Team Members",
        url: "/users",
        description: "Manage team access and roles",
      },
      {
        title: "Departments",
        url: "/departments",
        description: "QS, Engineering, Finance, Procurement",
      },
      {
        title: "Permissions",
        url: "/permissions",
        description: "Role-based access control",
      },
    ],
  },
];
