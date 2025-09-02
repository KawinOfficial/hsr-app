"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Plus, Search, Users, BadgePlus, TimerReset } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkflowList } from "./WorkflowList.hook";
import { Pagination } from "@/components/pagination";
import { calculateTotalTimeLimit, formatDateWithTime } from "@/lib/format";

const WorkflowList = () => {
  const {
    setCreateWorkflowOpen,
    handleWorkflowDialog,
    list,
    pagination,
    onChangePage,
    handleSearch,
  } = useWorkflowList();

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
              <Input
                placeholder="Search workflows..."
                className="pl-10 w-64"
                onChange={handleSearch}
              />
            </div>
            <Button size="sm" onClick={() => setCreateWorkflowOpen?.(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 h-[75vh] overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            {list?.map((workflow, index) => (
              <Card
                key={`${index}-${workflow.workflowId}`}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2 space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">
                          {workflow.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {workflow.workflowId} • {workflow.description}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workflow.steps.length} steps</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BadgePlus className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {workflow.createdAt
                              ? formatDateWithTime(workflow.createdAt)
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TimerReset className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {workflow.updatedAt
                              ? formatDateWithTime(workflow.updatedAt)
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Total Document Types
                        </p>
                        <p className="text-lg font-bold text-rail-blue">
                          {workflow.totalDocs}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Total Time Limit
                        </p>
                        <p className="text-lg font-bold text-success-green">
                          {calculateTotalTimeLimit(workflow.steps)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Workflow Steps
                        </p>
                        <div className="space-y-1">
                          {workflow.steps.slice(0, 3).map((step, idx) => (
                            <div
                              key={`${idx}-${step.name}`}
                              className="flex items-center space-x-2 text-xs"
                            >
                              <div className="w-6 h-6 rounded-full bg-rail-blue text-white flex items-center justify-center font-medium">
                                {idx + 1}
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
                          onClick={() =>
                            handleWorkflowDialog?.(workflow.id ?? "")
                          }
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination
            totalPages={pagination?.totalPages ?? 0}
            currentPage={pagination?.currentPage ?? 1}
            onPageChange={onChangePage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowList;
