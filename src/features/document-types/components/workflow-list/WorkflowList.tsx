"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Edit,
  Eye,
  Filter,
  Plus,
  Search,
  Target,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "@/features/document-types/utils/colorStatus";
import { useWorkflowList } from "./WorkflowList.hook";

const WorkflowList = () => {
  const { workflowTemplates, setCreateWorkflowOpen, handleWorkflowDialog } =
    useWorkflowList();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Approval Workflows</CardTitle>
            <CardDescription>
              Configure approval workflows and templates
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search workflows..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setCreateWorkflowOpen?.(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflowTemplates?.map((workflow) => (
            <Card
              key={workflow.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {workflow.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {workflow.id} • {workflow.description}
                        </p>
                      </div>
                      <Badge className={getCategoryColor(workflow.category)}>
                        {workflow.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{workflow.steps.length} steps</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{workflow.averageCompletionTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{workflow.successRate}% success</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Total Executions
                      </p>
                      <p className="text-lg font-bold text-rail-blue">
                        {workflow.totalExecutions}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Success Rate
                      </p>
                      <p className="text-lg font-bold text-success-green">
                        {workflow.successRate}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Workflow Steps
                      </p>
                      <div className="space-y-1">
                        {workflow.steps.slice(0, 3).map((step, index) => (
                          <div
                            key={step.id}
                            className="flex items-center space-x-2 text-xs"
                          >
                            <div className="w-6 h-6 rounded-full bg-rail-blue text-white flex items-center justify-center font-medium">
                              {index + 1}
                            </div>
                            <span className="truncate">{step.name}</span>
                          </div>
                        ))}
                        {workflow.steps.length > 3 && (
                          <p className="text-xs text-muted-foreground pl-8">
                            +{workflow.steps.length - 3} more steps
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleWorkflowDialog?.(workflow)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowList;
