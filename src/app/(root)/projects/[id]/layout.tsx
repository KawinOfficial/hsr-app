import { ProjectDetailProvider } from "@/features/project-overview/components/project-detail-provider";
import { MilestonesTrackerProvider } from "@/features/project-overview/components/milestones-tracker-provider";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectDetailProvider>
      <MilestonesTrackerProvider>{children}</MilestonesTrackerProvider>
    </ProjectDetailProvider>
  );
}
