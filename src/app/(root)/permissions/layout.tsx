import { PermissionProvider } from "@/features/permissions/components/permission-provider";

export default function PermissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PermissionProvider>{children}</PermissionProvider>;
}
