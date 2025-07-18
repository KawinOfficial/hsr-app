import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { SummaryStats } from "@/features/project-overview/components/summary-stats";
import ProjectList from "@/features/project-overview/components/project-list/ProjectList";
import { Plus } from "lucide-react";
import { ProjectProvider } from "@/features/project-overview/components/project-provider";

export default function ProjectsOverview() {
  return (
    <ProjectProvider>
      <div className="bg-background">
        <PageHeader
          title="Projects Overview"
          subTitle="Comprehensive view of all Thai-Chinese HSR project sections"
        >
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </PageHeader>

        <div className="px-4 sm:px-6 py-8">
          <SummaryStats />
          <ProjectList />
        </div>
      </div>
    </ProjectProvider>
  );
}
