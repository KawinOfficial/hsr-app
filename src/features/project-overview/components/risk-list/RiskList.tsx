import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRiskColor } from "@/features/project-overview/utils/badgeColor";

const RiskList = () => {
  const projectDetails = useContextSelector(
    ProjectDetailContext,
    (state) => state?.projectDetails
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Management</CardTitle>
            <CardDescription>
              Identified risks and mitigation strategies
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projectDetails?.risks.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{risk.description}</h4>
                  <p className="text-sm text-muted-foreground">ID: {risk.id}</p>
                </div>
                <Badge variant="outline">{risk.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Impact: </span>
                  <span className={getRiskColor(risk.impact)}>
                    {risk.impact}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Probability: </span>
                  <span className={getRiskColor(risk.probability)}>
                    {risk.probability}
                  </span>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">
                  Mitigation Strategy
                </h5>
                <p className="text-sm text-muted-foreground">
                  {risk.mitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskList;
