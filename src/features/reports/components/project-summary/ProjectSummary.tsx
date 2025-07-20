"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import {
  getStatusColor,
  getVarianceColor,
} from "@/features/reports/utils/colorStatus";
import { getRiskColor } from "@/features/reports/utils/colorStatus";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useProjectSummary } from "./ProjectSummary.hook";

const ProjectSummary = () => {
  const { projectSummaries, onViewProject } = useProjectSummary();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Performance Summary</CardTitle>
        <CardDescription>
          Comprehensive overview of all project sections and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projectSummaries.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {project.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <span
                          className={`text-sm font-medium ${getRiskColor(
                            project.riskLevel
                          )}`}
                        >
                          {project.riskLevel} Risk
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          Expected Completion
                        </p>
                        <p className="font-medium">{project.completion}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Milestones</p>
                        <p className="font-medium">
                          {project.milestones.completed}/
                          {project.milestones.total} completed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Total Budget
                      </p>
                      <p className="text-sm font-bold text-rail-blue">
                        {formatCurrency(project.budget)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Amount Spent
                      </p>
                      <p className="text-sm font-bold text-construction-orange">
                        {formatCurrency(project.spent)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Budget Variance
                      </p>
                      <p
                        className={`text-sm font-bold ${getVarianceColor(
                          project.variance
                        )}`}
                      >
                        {project.variance > 0 ? "+" : ""}
                        {project.variance}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="text-sm font-bold text-success-green">
                        {formatCurrency(project.budget - project.spent)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => onViewProject(project.id)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
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

export default ProjectSummary;
