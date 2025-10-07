import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/features/project-overview/schemas/Project.schema";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getStatusColor,
  getRiskColor,
  getVarianceColor,
} from "@/features/project-overview/utils/badgeColor";
import { PAGE_ROUTES } from "@/routers/page";
import { pathToUrl } from "@/lib/router";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();

  function onViewProject() {
    router.push(
      pathToUrl(PAGE_ROUTES.PROJECT_DETAIL, {
        id: project.id,
      })
    );
  }
  return (
    <Card
      className="transition-all duration-200 hover:shadow-md cursor-pointer"
      onClick={onViewProject}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 lg:space-y-0">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 ">
                  <h3 className="font-semibold text-lg ">{project.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    Project ID: {project.projectId}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <span
                    className={`text-xs font-medium ${getRiskColor(
                      project.riskLevel
                    )}`}
                  >
                    {project.riskLevel} Risk
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">
                    Due: {formatDate(project.targetDate)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{project.team} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">
                    {project.milestones.completed}/{project.milestones.total}{" "}
                    milestones
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Progress and Financial Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-xl font-bold text-primary">
                  {project.progress}%
                </p>
                <Progress value={project.progress} className="h-2 mt-2" />
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Cost Variance</p>
                <div className="flex items-center justify-center">
                  {!project.variance ? (
                    ""
                  ) : project.variance > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-destructive" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1 text-success-green" />
                  )}
                  <p
                    className={`text-sm font-bold ${getVarianceColor(
                      project.variance
                    )}`}
                  >
                    {project.variance > 0 ? "+" : ""}
                    {project.variance}%
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-muted/30 rounded">
                <p className="text-muted-foreground">Budget</p>
                <p className="font-semibold text-xs">
                  {formatCurrency(project.budget)}
                </p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded">
                <p className="text-muted-foreground">Spent</p>
                <p className="font-semibold text-xs">
                  {formatCurrency(project.spent)}
                </p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded">
                <p className="text-muted-foreground">Remaining</p>
                <p className="font-semibold text-xs text-success-green">
                  {formatCurrency(project.budget - project.spent)}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            <div className="col-span-2 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    Project ID: {project.projectId}
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

              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {formatDate(project.targetDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.team} team members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {project.milestones.completed}/{project.milestones.total}{" "}
                    milestones
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-primary">
                  {project.progress}%
                </p>
              </div>
              <Progress value={project.progress} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-semibold">
                    {formatCurrency(project.budget)}
                  </p>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <p className="text-muted-foreground">Spent</p>
                  <p className="font-semibold">
                    {formatCurrency(project.spent)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 h-full">
              <div className="text-center h-1/2 flex flex-col items-center justify-center bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Cost Variance</p>
                <div className="flex items-center justify-center">
                  {!project.variance ? (
                    ""
                  ) : project.variance > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-destructive" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1 text-success-green" />
                  )}
                  <p
                    className={`text-sm font-bold ${getVarianceColor(
                      project.variance
                    )}`}
                  >
                    {project.variance > 0 ? "+" : ""}
                    {project.variance}%
                  </p>
                </div>
              </div>

              <div className="text-center h-1/2 flex flex-col items-center justify-center bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Remaining Budget
                </p>
                <p className="text-sm font-bold text-success-green">
                  {formatCurrency(project.budget - project.spent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
