import { ProjectDetailProvider } from "@/features/project-overview/components/project-detail-provider";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectDetailProvider>{children}</ProjectDetailProvider>;
}
