"use client";

import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";
import { ProjectInformation } from "@/features/project-overview/components/project-information";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS } from "@/features/project-overview/constants/options";
import { Timeline } from "@/features/project-overview/components/timeline";
import { Team } from "@/features/project-overview/components/team";
import { Document } from "@/features/project-overview/components/document";
import { RiskList } from "@/features/project-overview/components/risk-list";
import { MilestonesTracker } from "@/features/project-overview/components/milestones-tracker";

export default function ProjectDetail() {
  const params = useParams();
  const { isEditMode, handleEdit, handleCancel, handleSave } =
    useContextSelector(ProjectDetailContext, (state) => ({
      isEditMode: state?.isEditMode,
      handleEdit: state?.handleEdit,
      handleCancel: state?.handleCancel,
      handleSave: state?.handleSave,
    }));

  return (
    <div className="bg-background">
      <PageHeader title="Project Detail" subTitle={params.id as string}>
        {isEditMode ? (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        )}
      </PageHeader>

      <div className="space-y-6 p-6">
        <ProjectInformation />

        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="timeline">
            <Timeline />
          </TabsContent>
          <TabsContent value="team">
            <Team />
          </TabsContent>
          <TabsContent value="documents">
            <Document />
          </TabsContent>
          <TabsContent value="risks">
            <RiskList />
          </TabsContent>
          <TabsContent value="milestones">
            <MilestonesTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
