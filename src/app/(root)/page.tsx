import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { KeyMetrics } from "@/features/dashboard/components/key-metrics";
import { ProjectOverview } from "@/features/dashboard/components/project-overview";
import { SystemStatus } from "@/features/dashboard/components/system-status";
import { ActiveProject } from "@/features/dashboard/components/active-project";
import { RecentActivities } from "@/features/dashboard/components/recent-activities";

export default function Dashboard() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Project Dashboard"
        subTitle="Overview of Thai-Chinese High-Speed Rail construction progress"
      >
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
      </PageHeader>

      <div className="px-4 sm:px-6 py-8">
        <KeyMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          <ProjectOverview />
          <SystemStatus />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ActiveProject />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}
