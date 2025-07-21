import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getStatusColor,
  getRiskColor,
} from "@/features/project-overview/utils/badgeColor";
import { useProjectInformation } from "./ProjectInformation.hook";
import {
  RISK_OPTIONS,
  STATUS_OPTIONS,
} from "@/features/project-overview/constants/options";
import { formatCurrency } from "@/lib/format";

const ProjectInformation = () => {
  const { isEditMode, project } = useProjectInformation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Project Status
              </Label>
              {isEditMode ? (
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="mt-1">
                  <Badge className={getStatusColor(project?.status || "")}>
                    {project?.status}
                  </Badge>
                </div>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Risk Level
              </Label>
              {isEditMode ? (
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="mt-1">
                  <span
                    className={`font-medium ${getRiskColor(
                      project?.riskLevel || ""
                    )}`}
                  >
                    {project?.riskLevel || ""} Risk
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Description
            </Label>
            {isEditMode ? (
              <Textarea className="mt-1" rows={3} />
            ) : (
              <p className="mt-1 text-sm">{project?.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Start Date
              </Label>
              {isEditMode ? (
                <Input type="date" className="mt-1" />
              ) : (
                <p className="mt-1 text-sm">{project?.startDate}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Expected Completion
              </Label>
              {isEditMode ? (
                <Input type="date" className="mt-1" />
              ) : (
                <p className="mt-1 text-sm">{project?.completion}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Progress
            </Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{project?.progress}%</span>
              </div>
              <Progress value={project?.progress || 0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold text-rail-blue">
              {formatCurrency(project?.budget || 0)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-3 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="text-sm font-semibold text-construction-orange">
                {formatCurrency(project?.spent || 0)}
              </p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-sm font-semibold text-success-green">
                {formatCurrency((project?.budget || 0) - (project?.spent || 0))}
              </p>
            </div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded">
            <p className="text-xs text-muted-foreground">Cost Variance</p>
            <p
              className={`text-sm font-semibold ${
                !!project?.variance && project?.variance >= 0
                  ? "text-success-green"
                  : "text-destructive"
              }`}
            >
              {!!project?.variance ? "+" : ""}
              {project?.variance}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectInformation;
