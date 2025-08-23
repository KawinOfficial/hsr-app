import { ProjectDetailProvider } from "@/features/project-overview/components/project-detail-provider";
import { MilestonesProvider } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { UsersProvider } from "@/features/team-members/components/users-provider";

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ProjectDetailProvider id={id}>
      <MilestonesProvider>
        <UsersProvider>{children}</UsersProvider>
      </MilestonesProvider>
    </ProjectDetailProvider>
  );
}
