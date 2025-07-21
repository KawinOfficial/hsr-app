"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useReportFinancial } from "./ReportFinancial.hook";
import { getVarianceColor } from "@/features/reports/utils/colorStatus";

const ReportFinancial = () => {
  const { monthlyData, financialMetrics, breakdownData } = useReportFinancial();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Performance</CardTitle>
            <CardDescription>
              Revenue vs expenses trend over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[33vh] overflow-y-auto">
              {monthlyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{data.month}</span>
                    <span className="text-sm text-muted-foreground">
                      Profit: {formatCurrency(data.profit)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-rail-blue/10 rounded">
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="text-sm font-semibold text-rail-blue">
                        {formatCurrency(data.revenue)}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-construction-orange/10 rounded">
                      <p className="text-xs text-muted-foreground">Expenses</p>
                      <p className="text-sm font-semibold text-construction-orange">
                        {formatCurrency(data.expenses)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>
              Current cash flow status and projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Current Cash Flow
                </p>
                <p className="text-3xl font-bold text-success-green">
                  {formatCurrency(financialMetrics.cashFlow)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Positive monthly flow
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Monthly Burn</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(financialMetrics.monthlyBurn)}
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">
                    Budget Variance
                  </p>
                  <p
                    className={`text-lg font-semibold ${getVarianceColor(
                      financialMetrics.budgetVariance
                    )}`}
                  >
                    {financialMetrics.budgetVariance > 0 ? "+" : ""}
                    {financialMetrics.budgetVariance}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Liquidity Ratio</span>
                  <span className="font-medium">3.2:1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Operating Margin</span>
                  <span className="font-medium">24.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Debt-to-Equity</span>
                  <span className="font-medium">0.15:1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Income & Expense Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of project income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdownData.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{formatCurrency(row.amount)}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>
                    {Number(row.percentage) > 0 ? (
                      <TrendingUp className="h-4 w-4 text-success-green" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportFinancial;
