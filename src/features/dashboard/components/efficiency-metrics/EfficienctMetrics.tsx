import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

const EfficienctMetrics = () => {
  return (
    <div>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Cost Efficiency Metrics</CardTitle>
          <CardDescription>
            Key performance indicators for cost management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[30vh] overflow-y-auto">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <span className="text-sm font-medium">
                Cost Performance Index (CPI)
              </span>
              <span className="text-lg font-bold text-success-green">1.08</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <span className="text-sm font-medium">
                Schedule Performance Index (SPI)
              </span>
              <span className="text-lg font-bold text-warning-amber">0.94</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <span className="text-sm font-medium">
                Estimate at Completion (EAC)
              </span>
              <span className="text-lg font-bold">
                {formatCurrency(2780000000)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <span className="text-sm font-medium">
                Variance at Completion (VAC)
              </span>
              <span className="text-lg font-bold text-success-green">
                {formatCurrency(70000000)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EfficienctMetrics;
