import DepartmentProvider from "@/features/departments/components/department-provider/DepartmentProvider";

export default function DepartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DepartmentProvider>{children}</DepartmentProvider>;
}
