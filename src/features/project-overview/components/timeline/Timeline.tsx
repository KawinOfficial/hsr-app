import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getStatusColor } from "@/features/project-overview/utills/badgeColor";
import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";

const Timeline = () => {
  const projectDetails = useContextSelector(
    ProjectDetailContext,
    (state) => state?.projectDetails
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>
          Detailed phase breakdown and progress tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projectDetails?.timeline.map((phase, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{phase.phase}</h4>
                <Badge className={getStatusColor(phase.status)}>
                  {phase.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Start: </span>
                  {phase.startDate}
                </div>
                <div>
                  <span className="text-muted-foreground">End: </span>
                  {phase.endDate}
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Milestones</h5>
                <div className="space-y-1">
                  {phase.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{milestone.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {milestone.date}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {milestone.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
