import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/format";

const activeProjects = [
  {
    id: "TH-CN-001",
    name: "Bangkok-Nakhon Ratchasima Section",
    progress: 68,
    budget: 890000000,
    spent: 605200000,
    status: "On Track",
    phase: "Track Installation",
    manager: "Somchai Tanakorn",
  },
  {
    id: "TH-CN-002",
    name: "Nakhon Ratchasima-Nong Khai Section",
    progress: 34,
    budget: 1200000000,
    spent: 408000000,
    status: "Delayed",
    phase: "Foundation Work",
    manager: "Wang Li",
  },
  {
    id: "TH-CN-003",
    name: "Rolling Stock Procurement",
    progress: 45,
    budget: 760000000,
    spent: 342000000,
    status: "On Track",
    phase: "Manufacturing",
    manager: "Chen Wei",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "On Track":
      return "bg-success-green";
    case "Delayed":
      return "bg-warning-amber";
    case "At Risk":
      return "bg-construction-orange";
    default:
      return "bg-muted";
  }
}

const ActiveProject = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-primary" />
          Active Projects
        </CardTitle>
        <CardDescription>
          Monitor progress and financial status of ongoing projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    ID: {project.id}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    project.status
                  )} text-white border-none`}
                >
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Budget: </span>
                    <span className="font-medium">
                      {formatCurrency(project.budget)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Spent: </span>
                    <span className="font-medium">
                      {formatCurrency(project.spent)}
                    </span>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Phase: </span>
                  <span className="font-medium">{project.phase}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveProject;
