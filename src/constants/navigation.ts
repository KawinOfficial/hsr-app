import { PAGE_ROUTES } from "@/routers/page";

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    url: PAGE_ROUTES.DASHBOARD,
    iconName: "Home",
  },
  {
    title: "Project Management",
    iconName: "Building2",
    items: [
      {
        title: "Project Overview",
        url: PAGE_ROUTES.PROJECTS,
        description: "View all active projects",
      },
      {
        title: "Milestones",
        url: PAGE_ROUTES.MILESTONES,
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
        url: PAGE_ROUTES.PAYMENTS,
        description: "Process payments and advance requests",
      },
      {
        title: "Asset Management",
        url: PAGE_ROUTES.ASSETS,
        description: "Register and manage project assets",
      },
      {
        title: "Liabilities",
        url: PAGE_ROUTES.LIABILITIES,
        description: "Track project liabilities and obligations",
      },
      {
        title: "Document Type",
        url: PAGE_ROUTES.DOCUMENT_TYPES,
        description: "Manage document types and approval workflows",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    iconName: "BarChart3",
    items: [
      {
        title: "Financial Reports",
        url: PAGE_ROUTES.REPORTS_FINANCIAL,
        description: "Income and expense reports",
      },
      {
        title: "Project Summary",
        url: PAGE_ROUTES.REPORTS_SUMMARY,
        description: "Comprehensive project reports",
      },
      {
        title: "Cost Analysis",
        url: PAGE_ROUTES.REPORTS_COST_ANALYSIS,
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
        url: PAGE_ROUTES.USERS,
        description: "Manage team access and roles",
      },
      {
        title: "Departments",
        url: PAGE_ROUTES.DEPARTMENTS,
        description: "QS, Engineering, Finance, Procurement",
      },
      {
        title: "Permissions",
        url: PAGE_ROUTES.PERMISSIONS,
        description: "Role-based access control",
      },
    ],
  },
];
