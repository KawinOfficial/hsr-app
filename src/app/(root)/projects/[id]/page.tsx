"use client";

import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";
import { ProjectInformation } from "@/features/project-overview/components/project-information";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS } from "@/features/project-overview/constants/options";
import { Document } from "@/features/project-overview/components/document";
import { MilestonesTracker } from "@/features/project-overview/components/milestones-tracker";
import { MilestoneDialog } from "@/features/milestones/components/milestone-dialog";

export default function ProjectDetail() {
  const { isEditMode, handleEdit, handleCancel, handleSave } =
    useContextSelector(ProjectDetailContext, (state) => ({
      isEditMode: state?.isEditMode,
      handleEdit: state?.handleEdit,
      handleCancel: state?.handleCancel,
      handleSave: state?.handleSave,
    }));

  return (
    <div className="bg-background">
      <PageHeader title="Project Detail">
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

        <Tabs defaultValue="milestones" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="milestones">
            <MilestonesTracker />
          </TabsContent>
          <TabsContent value="documents">
            <Document />
          </TabsContent>
        </Tabs>
      </div>

      <MilestoneDialog />
    </div>
  );
}
