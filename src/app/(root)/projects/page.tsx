import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { SummaryStats } from "@/features/project-overview/components/summary-stats";
import ProjectList from "@/features/project-overview/components/project-list/ProjectList";
import { ProjectProvider } from "@/features/project-overview/components/project-provider";
import CreateProjectDialog from "@/features/project-overview/components/create-project-dialog";

export default function ProjectsOverview() {
  return (
    <ProjectProvider>
      <div className="bg-background">
        <PageHeader
          title="Projects Overview"
          subTitle="Comprehensive view of all Thai-Chinese HSR project sections"
        >
          <CreateProjectDialog />
        </PageHeader>

        <div className="px-4 sm:px-6 py-8">
          <SummaryStats />
          <ProjectList />
        </div>
      </div>
    </ProjectProvider>
  );
}
