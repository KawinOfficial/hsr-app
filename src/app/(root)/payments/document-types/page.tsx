import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentList } from "@/features/document-types/components/document-list";
import { SummaryStats } from "@/features/document-types/components/summary-stats";
import { TABS } from "@/features/document-types/constants/tabs";
import { CreateDocumentDialog } from "@/features/document-types/components/create-document-dialog";
import { DocumentDialog } from "@/features/document-types/components/document-dialog";
import { WorkflowList } from "@/features/document-types/components/workflow-list";
import { CreateWorkflowDialog } from "@/features/document-types/components/create-workflow-dialog";
import { WorkflowDialog } from "@/features/document-types/components/workflow-dialog";
import EditWorkflowDialog from "@/features/document-types/components/edit-workflow-dialog/EditWorkflowDialog";

export default function DocumentTypesPage() {
  return (
    <div>
      <PageHeader
        title="Document Types"
        subTitle="Manage document types and approval workflows"
      />

      <div className="px-4 sm:px-6 py-8">
        <SummaryStats />

        <Tabs defaultValue={TABS[0].value} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            {TABS.map((tab, index) => (
              <TabsTrigger
                key={`${tab.value}-${index}`}
                value={tab.value}
                className="flex items-center"
              >
                {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={TABS[0].value}>
            <DocumentList />
          </TabsContent>
          <TabsContent value={TABS[1].value}>
            <WorkflowList />
          </TabsContent>
        </Tabs>

        <CreateDocumentDialog />
        <DocumentDialog />
        <CreateWorkflowDialog />
        <WorkflowDialog />
        <EditWorkflowDialog />
      </div>
    </div>
  );
}
