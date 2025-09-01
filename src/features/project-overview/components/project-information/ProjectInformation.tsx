import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getStatusColor,
  getRiskColor,
} from "@/features/project-overview/utils/badgeColor";
import { useProjectInformation } from "./ProjectInformation.hook";
import { STATUS_OPTIONS } from "@/features/project-overview/constants/options";
import { formatCurrency, formatDate } from "@/lib/format";
import { PRIORITY_OPTIONS } from "@/features/milestones/constants/options";
import { Controller } from "react-hook-form";
import { Loading } from "@/components/loading";

const ProjectInformation = () => {
  const { isEditMode, project, methods, isLoading, getDepartmentName } =
    useProjectInformation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isLoading && <Loading />}
      <form className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{project?.name}</CardTitle>
            <CardDescription>{project?.projectId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Project Status
                </Label>
                {isEditMode ? (
                  <Controller
                    control={methods?.control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.filter(
                            (option) => option.value !== "all"
                          ).map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                  <Controller
                    control={methods?.control}
                    name="riskLevel"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                <Controller
                  control={methods?.control}
                  name="description"
                  render={({ field }) => (
                    <Textarea className="mt-1" rows={3} {...field} />
                  )}
                />
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
                  <Controller
                    control={methods?.control}
                    name="startDate"
                    render={({ field }) => (
                      <Input type="date" className="mt-1" {...field} />
                    )}
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {formatDate(project?.startDate || "")}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Expected Completion
                </Label>
                {isEditMode ? (
                  <Controller
                    control={methods?.control}
                    name="targetDate"
                    render={({ field }) => (
                      <Input type="date" className="mt-1" {...field} />
                    )}
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {formatDate(project?.targetDate || "")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Location
                </Label>
                {isEditMode ? (
                  <Controller
                    control={methods?.control}
                    name="location"
                    render={({ field }) => (
                      <Input type="text" className="mt-1" {...field} />
                    )}
                  />
                ) : (
                  <p className="mt-1 text-sm">{project?.location}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Department
                </Label>
                {isEditMode ? (
                  <Controller
                    control={methods?.control}
                    name="departmentId"
                    render={({ field }) => (
                      <Input
                        type="text"
                        className="mt-1"
                        {...field}
                        value={field.value || ""}
                      />
                    )}
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {getDepartmentName(project?.departmentId || "")}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

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
              {project?.variance ? "+" : ""}
              {project?.variance}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectInformation;
