import { PAGE_ROUTES } from "@/routers/page";
import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";

interface NavigationItem {
  title: string;
  url?: string;
  description?: string;
  permission?: keyof PermissionsMatrix;
  requiredAction?: "read" | "create" | "update" | "delete";
}

interface Navigations {
  title: string;
  url?: string;
  iconName: string;
  items?: NavigationItem[];
  permission?: keyof PermissionsMatrix;
  requiredAction?: "read" | "create" | "update" | "delete";
}

export const NAVIGATION_ITEMS: Navigations[] = [
  // {
  //   title: "Dashboard",
  //   url: PAGE_ROUTES.DASHBOARD,
  //   iconName: "Home",
  // },
  {
    title: "Project Management",
    iconName: "Building2",
    permission: "projects",
    requiredAction: "read",
    items: [
      {
        title: "Project Overview",
        url: PAGE_ROUTES.PROJECTS,
        description: "View all active projects",
        permission: "projects",
        requiredAction: "read",
      },
      {
        title: "Milestones",
        url: PAGE_ROUTES.MILESTONES,
        description: "Track project milestones and deliverables",
        permission: "projects",
        requiredAction: "read",
      },
    ],
  },
  {
    title: "Financial Management",
    iconName: "DollarSign",
    permission: "financial",
    requiredAction: "read",
    items: [
      {
        title: "Payments & Advances",
        url: PAGE_ROUTES.PAYMENTS,
        description: "Process payments and advance requests",
        permission: "financial",
        requiredAction: "read",
      },
      {
        title: "Asset Management",
        url: PAGE_ROUTES.ASSETS,
        description: "Register and manage project assets",
        permission: "financial",
        requiredAction: "read",
      },
      {
        title: "Liabilities",
        url: PAGE_ROUTES.LIABILITIES,
        description: "Track project liabilities and obligations",
        permission: "financial",
        requiredAction: "read",
      },
      {
        title: "Document Type",
        url: PAGE_ROUTES.DOCUMENT_TYPES,
        description: "Manage document types and approval workflows",
        permission: "financial",
        requiredAction: "read",
      },
      {
        title: "Category",
        url: PAGE_ROUTES.CATEGORY,
        description: "Manage project cost categories",
        permission: "financial",
        requiredAction: "read",
      },
    ],
  },
  {
    title: "User Management",
    iconName: "Users",
    permission: "users",
    requiredAction: "read",
    items: [
      {
        title: "Team Members",
        url: PAGE_ROUTES.USERS,
        description: "Manage team access and roles",
        permission: "users",
        requiredAction: "read",
      },
      {
        title: "Departments",
        url: PAGE_ROUTES.DEPARTMENTS,
        description: "QS, Engineering, Finance, Procurement",
        permission: "users",
        requiredAction: "read",
      },
      {
        title: "Permissions",
        url: PAGE_ROUTES.PERMISSIONS,
        description: "Role-based access control",
        permission: "users",
        requiredAction: "read",
      },
    ],
  },
];
