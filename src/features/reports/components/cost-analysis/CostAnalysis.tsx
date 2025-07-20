"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getVarianceColor } from "@/features/reports/utils/colorStatus";
import { useCostAnalysis } from "./CostAnalysis.hook";

const CostAnalysis = () => {
  const { costAnalysisData } = useCostAnalysis();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Category Analysis</CardTitle>
          <CardDescription>
            Detailed cost breakdown and variance analysis by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost Category</TableHead>
                <TableHead>Budgeted</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Forecast</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costAnalysisData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{formatCurrency(item.budgeted)}</TableCell>
                  <TableCell>{formatCurrency(item.actual)}</TableCell>
                  <TableCell>
                    <span className={getVarianceColor(item.variance)}>
                      {item.variance > 0 ? "+" : ""}
                      {item.variance}%
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(item.forecast)}</TableCell>
                  <TableCell>
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-construction-orange" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success-green" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Efficiency Metrics</CardTitle>
            <CardDescription>
              Key performance indicators for cost management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm font-medium">
                  Cost Performance Index (CPI)
                </span>
                <span className="text-lg font-bold text-success-green">
                  1.08
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm font-medium">
                  Schedule Performance Index (SPI)
                </span>
                <span className="text-lg font-bold text-warning-amber">
                  0.94
                </span>
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

        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
            <CardDescription>
              Financial risks and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-destructive pl-4 py-2">
                <p className="font-medium text-sm">
                  High Risk: Material Price Inflation
                </p>
                <p className="text-xs text-muted-foreground">
                  Steel and concrete prices showing 8% increase
                </p>
              </div>
              <div className="border-l-4 border-warning-amber pl-4 py-2">
                <p className="font-medium text-sm">
                  Medium Risk: Currency Fluctuation
                </p>
                <p className="text-xs text-muted-foreground">
                  THB/CNY exchange rate volatility
                </p>
              </div>
              <div className="border-l-4 border-success-green pl-4 py-2">
                <p className="font-medium text-sm">
                  Low Risk: Labor Availability
                </p>
                <p className="text-xs text-muted-foreground">
                  Adequate skilled workforce secured
                </p>
              </div>
              <div className="border-l-4 border-rail-blue pl-4 py-2">
                <p className="font-medium text-sm">
                  Opportunity: Early Completion Bonus
                </p>
                <p className="text-xs text-muted-foreground">
                  Potential ฿50M bonus for early delivery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;
