import { ProjectDetailProvider } from "@/features/project-overview/components/project-detail-provider";
import { MilestonesProvider } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { UsersProvider } from "@/features/team-members/components/users-provider";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectDetailProvider>
      <MilestonesProvider>
        <UsersProvider>{children}</UsersProvider>
      </MilestonesProvider>
    </ProjectDetailProvider>
  );
}
