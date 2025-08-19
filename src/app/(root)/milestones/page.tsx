"use client";

import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { MilestonesProvider } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { SummaryStats } from "@/features/milestones/components/summary-stats";
import { TrackingList } from "@/features/milestones/components/tracking-list";
import { CreateMilestoneDialog } from "@/features/milestones/components/create-milestone-dialog";
import { MilestoneDialog } from "@/features/milestones/components/milestone-dialog";

export default function MilestonesPage() {
  return (
    <MilestonesProvider>
      <div className="bg-background">
        <PageHeader
          title=" Project Milestones"
          subTitle="Track project milestones and deliverables across all HSR sections"
        >
          <CreateMilestoneDialog />
        </PageHeader>

        <div className="px-4 sm:px-6 py-8">
          <SummaryStats />
          <TrackingList />
        </div>
      </div>

      <MilestoneDialog />
    </MilestonesProvider>
  );
}
