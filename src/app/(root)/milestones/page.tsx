"use client";

import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { MilestonesProvider } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { SummaryStats } from "@/features/milestones/components/summary-stats";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MILESTONE_TABS } from "@/features/milestones/constants/tabs";
import { Overview } from "@/features/milestones/components/overview";
import { MilestonesTimeline } from "@/features/milestones/components/milestones-timeline";
import { TrackingList } from "@/features/milestones/components/tracking-list";

export default function MilestonesPage() {
  return (
    <MilestonesProvider>
      <div className="bg-background">
        <PageHeader
          title=" Project Milestones"
          subTitle="Track project milestones and deliverables across all HSR sections"
        >
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Milestone
          </Button>
        </PageHeader>

        <div className="px-4 sm:px-6 py-8">
          <SummaryStats />

          <Tabs defaultValue={MILESTONE_TABS[0].value} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              {MILESTONE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Overview />
            </TabsContent>
            <TabsContent value="timeline" className="space-y-6">
              <MilestonesTimeline />
            </TabsContent>
            <TabsContent value="tracking" className="space-y-6">
              <TrackingList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MilestonesProvider>
  );
}
