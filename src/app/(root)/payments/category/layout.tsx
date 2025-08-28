import { CategoryProvider } from "@/features/category/components/category-provider";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CategoryProvider>{children}</CategoryProvider>;
}
