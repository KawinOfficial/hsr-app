import { ProjectProvider } from "@/features/project-overview/components/project-provider";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
