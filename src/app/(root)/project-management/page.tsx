import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Download, DollarSign, FileText } from "lucide-react";
import { CreateProject } from "@/features/project-management/components/create-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetPlaning } from "@/features/project-management/components/budget-planing";
import { BiddingManagement } from "@/features/project-management/components/bidding-management";

export default function ProjectManagement() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Project Management"
        subTitle="Manage project bidding and budget planning"
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <CreateProject />
        </div>
      </PageHeader>

      <div className="px-4 sm:px-6 py-8">
        <Tabs defaultValue="bidding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bidding" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Bidding Management
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Budget Planning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bidding" className="space-y-6">
            <BiddingManagement />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetPlaning />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
