import { PermissionContext } from "@/features/permissions/components/permission-provider";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useContextSelector } from "use-context-selector";

const permissionGroups: PermissionGroup[] = [
  {
    id: "PERM-001",
    name: "Project Manager",
    description: "Full access to all project functions",
    userCount: 3,
    permissions: {
      dashboard: { read: true, write: true, admin: true },
      projects: { read: true, write: true, admin: true },
      financial: { read: true, write: true, admin: true },
      reports: { read: true, write: true, admin: true },
      users: { read: true, write: true, admin: true },
      settings: { read: true, write: true, admin: true },
    },
    status: "Active",
  },
  {
    id: "PERM-002",
    name: "QS Officer",
    description: "Quality surveying and reporting access",
    userCount: 12,
    permissions: {
      dashboard: { read: true, write: false, admin: false },
      projects: { read: true, write: true, admin: false },
      financial: { read: true, write: false, admin: false },
      reports: { read: true, write: true, admin: false },
      users: { read: false, write: false, admin: false },
      settings: { read: false, write: false, admin: false },
    },
    status: "Active",
  },
  {
    id: "PERM-003",
    name: "Engineer",
    description: "Technical and engineering access",
    userCount: 25,
    permissions: {
      dashboard: { read: true, write: false, admin: false },
      projects: { read: true, write: true, admin: false },
      financial: { read: true, write: false, admin: false },
      reports: { read: true, write: false, admin: false },
      users: { read: false, write: false, admin: false },
      settings: { read: false, write: false, admin: false },
    },
    status: "Active",
  },
  {
    id: "PERM-004",
    name: "Finance Officer",
    description: "Financial management and payment access",
    userCount: 6,
    permissions: {
      dashboard: { read: true, write: false, admin: false },
      projects: { read: true, write: false, admin: false },
      financial: { read: true, write: true, admin: false },
      reports: { read: true, write: true, admin: false },
      users: { read: false, write: false, admin: false },
      settings: { read: false, write: false, admin: false },
    },
    status: "Active",
  },
];

export const usePermissionList = () => {
  const handleEdit = useContextSelector(
    PermissionContext,
    (state) => state?.handleEdit
  );
  return { permissionGroups, handleEdit };
};
