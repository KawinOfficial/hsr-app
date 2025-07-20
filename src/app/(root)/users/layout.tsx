import { UsersProvider } from "@/features/team-members/components/users-provider";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UsersProvider>{children}</UsersProvider>;
}
